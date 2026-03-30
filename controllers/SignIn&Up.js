import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { User } from "../models/UserModel.js";
import dotenv from 'dotenv'
dotenv.config();


export const register = async (req, res) => {
    try {
        const { name, email, number, password } = req.body;

        if (!name || !email || !number || !password) return res.status(401).json({ message: 'All Fields are required' });

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: 'User already registered.Please Login' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name, email, number,
            password: hashedPassword
        });
        console.log(newUser);
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.log('Error while registering', error);
        res.status(500).json({ message: 'Error while registering', error })
    }
}

export const login = async (req, res) => {
    try {
        const { number, password } = req.body
        const user = await User.findOne({ number })

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '7d' }
        )
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        await res.json({ id: user._id, name: user.name, email: user.email })

    } catch (error) {
        res.status(500).json({ message: 'Getting error while log-in' });
        console.log('Getting error while log-in', error);
    }
}

export const forgetPassword = async (req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User Not Found.Please Register' });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        user.resetOTP = crypto.createHash('sha256').update(otp).digest('hex');
        user.resetOTPExpires = Date.now() + 10 * 60 * 1000;

        await user.save();
        console.log(process.env.EMAIL_PASS);
        console.log(process.env.EMAIL_USER);

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        await transporter.sendMail({
            to: user.email,
            subject: 'Password reset opt for Twitter24',
            html: `<h2>Your OTP is: ${otp}</h2><p>Valid for 10 minutes</p>`,
        });
        res.json({ message: "OTP sent to email" });
    } catch (error) {
        console.log("getting error while sending otp", error);
        res.status(500).json({ message: "getting error while sending otp" });
    }
}

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const hashedOTP = crypto
            .createHash("sha256")
            .update(otp)
            .digest("hex");

        const user = await User.findOne({
            email,
            resetOTP: hashedOTP,
            resetOTPExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // temporary session token
        const resetSessionToken = crypto.randomBytes(32).toString("hex");

        user.resetSessionToken = crypto
            .createHash("sha256")
            .update(resetSessionToken)
            .digest("hex");

        user.resetSessionExpires = Date.now() + 10 * 60 * 1000;

        user.resetOTP = undefined;
        user.resetOTPExpires = undefined;

        console.log("Setting reset token...");
        console.log("Before save:", user.resetSessionToken);

        await user.save();

        console.log("After save:", user.resetSessionToken);
        console.log("Expires:", user.resetSessionExpires);

        res.json({
            message: "OTP verified",
            resetToken: resetSessionToken
        });

    } catch (error) {
        res.status(500).json({ message: "OTP verification failed" });
    }
};

export const resetPassword = async (req, res) => {
    try {
        console.log("BODY:", req.body);
        const { resetToken, newPassword } = req.body;
        console.log("resetToken received:", resetToken);

        const hashedToken = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        const user = await User.findOne({
            resetSessionToken: hashedToken,
            resetSessionExpires: { $gt: Date.now() }
        });
        const allUsers = await User.find();
        console.log("All users reset tokens:");
        allUsers.forEach(u => {
            console.log({
                email: u.email,
                resetSessionToken: u.resetSessionToken,
                resetSessionExpires: u.resetSessionExpires
            });
        });

        if (!user) {
            return res.status(400).json({ message: "Session expired" });
        }

        user.password = await bcrypt.hash(newPassword, 10);

        user.resetSessionToken = undefined;
        user.resetSessionExpires = undefined;

        await user.save();

        res.json({ message: "Password updated successfully" });
        console.log("RESET PASSWORD API CALLED");
    } catch (error) {
        res.status(500).json({ message: "Reset failed" });
    }
};

export const logoutUser = (req, res) => {
    try {
        res.cookie("token", "", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            expires: new Date(0)
        });

        res.json({ message: "Logged out successfully" });
    } catch (error) {
        console.log('Logout Error', error);
    }

};

export const getCurrentUser = (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    });
}