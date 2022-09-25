import User from "../models/user.js";
import jwt from 'jsonwebtoken';
import UnauthenticatedError from '../errors/unauthenticated.js';

const auth = async (req, res, next) => { 
    const authHeader = req.headers.authorization;
    // check auth header
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication invalid');
    }
    // get token from header
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // attach the user to the job routes
        req.user = { userId: decoded.userId, name: decoded.name };
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid');
    }
}

export default auth;