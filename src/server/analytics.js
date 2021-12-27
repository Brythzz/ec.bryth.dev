import dotenv from 'dotenv';
dotenv.config();


/////////////////////////////////////
//  MONGODB
/////////////////////////////////////

import mongoose from 'mongoose';
const { model, Schema } = mongoose;

// Database Schemas
const User   = model('users', Schema({ _id: Number, logins: Number }, { versionKey: false }));
const School = model('schools', Schema({ name: String, uniqueLogins: Number }, { versionKey: false }));

// Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true });


/////////////////////////////////////
//  ANALYTICS
/////////////////////////////////////

const incrementSchoolUniqueLogins = async (name) => {
    School.findOneAndUpdate(
        { name }, 
        { $inc: { uniqueLogins: 1 } }, 
        { upsert: true, new: true }
    ).exec();
}

const incrementUserLogins = async ({ uid, school }) => {
    const doc = await User.findOneAndUpdate(
        { _id: uid },
        { $inc: { logins: 1 }, _id: uid },
        { upsert: true, new: true }
    ).exec();

    if (doc.logins === 1)
        await incrementSchoolUniqueLogins(school);
}

export const updateAnalytics = (user) => {
    incrementUserLogins(user);
}

// TODO: If there are too many requests for the db to handle,
// cache data locally and push it to the db every x mins/h
