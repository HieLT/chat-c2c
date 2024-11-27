import { Router, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User, IUser } from "../models/user";

const authRouter = Router();
const JWT_SECRET = "your_jwt_secret_key";

// Register User
authRouter.post("/register", async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "Email already in use" });
            return; 
        }

        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Login User
authRouter.post("/login", async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "User not found" });
            return;
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(400).json({ message: "Invalid credentials" });
            return;
        }

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ token, user });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

export default authRouter;
