import User from '../models/user.js';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import BadRequestError from '../errors/bad-request.js';
import UnauthenticatedError from '../errors/unauthenticated.js';

const register = async (req, res) => {
    const { name, email, password } = req.body;

    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const tempUser = { name, email, password: hashedPassword };

    // jwt
    const token = jwt.sign(
        { userId: tempUser._id, name: tempUser.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    )

    const user = await User.create(tempUser);
    res.status(StatusCodes.CREATED).json({
        user: { name: user.name },
        token
    });

}

const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password){
        throw new BadRequestError('Please provide email and password');
    }

    // test if email and password match
    const user = await User.findOne({ email });
    const correct = await bcrypt.compare(password, user.password);
    if(!user || !correct){ 
        throw new UnauthenticatedError('Invalid Credentials');
    }

    // jwt
    const token = jwt.sign(
        { userId: req.body._id, name: req.body.name },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_LIFETIME }
    )

    res.status(StatusCodes.OK).json({
        user: { name: user.name },
        token
    });
}

export {
    register,
    login
}