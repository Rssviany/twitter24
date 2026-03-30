import express from 'express'
import { forgetPassword, getCurrentUser, login, logoutUser, register, resetPassword, verifyOTP } from '../controllers/SignIn&Up.js';
import { protect } from '../middleware/authentication.js';

const loginRouter=express.Router();

loginRouter.post('/api/auth/register',register);
loginRouter.post('/api/auth/login',login);
loginRouter.post('/api/auth/forget_password',forgetPassword);
loginRouter.post('/api/auth/reset_password',resetPassword);
loginRouter.post('/api/auth/logout',logoutUser)
loginRouter.get('/api/auth/me',protect,getCurrentUser)
loginRouter.post('/api/auth/verify_otp',verifyOTP);

export default loginRouter;