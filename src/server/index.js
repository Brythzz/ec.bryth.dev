import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import EcoleDirecte from './ecoledirecte.js';

import dotenv from 'dotenv';
dotenv.config();


//////////////////////////////////////
//  EXPRESS
//////////////////////////////////////

const app = express();

app.disable('x-powered-by');
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());


//////////////////////////////////////
//  ROUTES
//////////////////////////////////////

app.post('/api/v2/login', async (req, res) => {
    const { username, password, keepLoggedIn=false } = req.body;
    const isRequestValid = username && password;

    if (!isRequestValid) return res.sendStatus(400);

    try {
        const client = new EcoleDirecte();
        const user   = await client.getUser(username, password);
        const grades = await client.getGrades(user);

        if (keepLoggedIn) {
            const maxAge = 1000 * 60 * 60 * 24 * 365;
            const { id, token } = user;

            res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'strict', maxAge });
            res.cookie('id', id, { maxAge });
            res.cookie('ua', client.userAgent, { maxAge });
        }
        res.send({ ...user, grades });
    }
    catch (err) {
        res.status(401).send(err);
    }
});

app.get('/api/v2/grades', async (req, res) => {
    const { token, id, ua } = req.cookies;
    const isRequestValid = token && id && ua;

    if (!isRequestValid) return res.sendStatus(400);

    try {
        const client = new EcoleDirecte();
        const grades = await client.getGrades({ id, token, ua });
        res.send(grades);
    }
    catch (err) {
        res.status(401).send(err);
    }
});

app.post('/api/v2/logout', (_, res) => {
    res.clearCookie('ua');
    res.clearCookie('id');
    res.clearCookie('token');

    res.sendStatus(200);
});

app.get('*', (_, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
});


//////////////////////////////////////
//  MAIN
//////////////////////////////////////

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
