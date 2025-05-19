import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoter from './Router/User.router.js';
dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log('MongoDB connected');
}).catch((err) => {
      console.log('MongoDB connection error:', err);
});
const app= express();

app.listen(process.env.PORT||3000, ()=> {
      console.log('Server is running on port',process.env.PORT);
      })

app.use('/user', UserRoter);