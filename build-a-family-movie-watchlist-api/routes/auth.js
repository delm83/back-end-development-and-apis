import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { findByUsername } from "../utils/db.js";

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret-key-12345";

router.post("/login", async (req, res) => {
    const { username, password } = req.body || {};

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    const user = findByUsername(username);
    if (!user) {
        return res.status(401).json({ error: "Invalid username or password." });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
        return res.status(401).json({ error: "Invalid username or password." });
    }

    const token = jwt.sign(
        {
            id: user.id,
            username: user.username,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: "24h" }
    );

    return res.status(200).json({ token });
});

export default router;