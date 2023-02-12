import path from 'path';
import express from 'express';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.disable('x-powered-by');
app.use(express.static('public'));

app.get('*', (_, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});
