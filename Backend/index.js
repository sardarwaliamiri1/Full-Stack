import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import UserRoter from './Router/User.router.js';
import AuthRoter from './Router/auth.router.js';
dotenv.config();
mongoose.connect(process.env.MONGO_URI).then(() => {
      console.log('MongoDB connected');
}).catch((err) => {
      console.log('MongoDB connection error:', err);
});
const app= express();
app.use(express.json());

app.listen(process.env.PORT||3000, ()=> {
      console.log('Server is running on port',process.env.PORT);
      })

app.use('/user', UserRoter);
app.use('/auth', AuthRoter);
app.use((err,req, res, next) => {
     const message= err.message || 'Internal Server Error'
     const statuscode= err.status || 500;
      return res.status(statuscode).json({
             success: false,
             message,
             statuscode
      })
})