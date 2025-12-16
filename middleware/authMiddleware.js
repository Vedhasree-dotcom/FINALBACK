const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");


// Middleware to verify JWT token
module.exports = async function authMiddleware(req, res, next) {    
    try{
        const header = req.headers.authorization;
        if(!header || !header.startsWith(`Bearer `)) return res.status
        (401).json({ message: "Missing authorization"});
        const token = header.split(" ")[1];
        let payload;
        try{
            payload = jwt.verify(token, process.env.JWT_SECRET);
        } catch(e) {
            return res.status(401).json({ message: "Invalid token"});
        }

        // attach user id and optionally user object
        req.user = { id: payload.id };
        next();

    } catch(err) {
        console.error('authMiddleware error', err);
        req.status(500).json({ message: "Server error in auth middleware"});

    }
};