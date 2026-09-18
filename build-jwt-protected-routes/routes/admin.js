import express from "express";
import  authenticate  from "../middleware/authenticate.js";
import  authorizeRole  from "../middleware/authorize.js";
import { readUsers } from "../utils/db.js";

const router = express.Router();

router.get("/users", authenticate, authorizeRole("admin"), (req, res) => {
    const allUsers = readUsers();
    
    // Strip passwordHash from each user
    const users = allUsers.map(user => {
        const { passwordHash, ...userWithoutPassword } = user;
        return userWithoutPassword;
    });

    res.json({ users });
});

export default router;