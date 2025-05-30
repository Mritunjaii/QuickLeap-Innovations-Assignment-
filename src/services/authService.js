const { AuthRepository } = require('../repositories');
const { ErrorResponse } = require('../utils/common');
const AppError = require('../utils/errors/app-error');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { serverConfig } = require('../config');
const bcrypt = require('bcryptjs');

const authRepo = new AuthRepository();


async function createUser(data) {
    try {
        email = data.email;
        const existingUser = await authRepo.findUserByEmail(email);
        if (existingUser) {
            throw new AppError("User already exists", StatusCodes.BAD_REQUEST);
        }
        
        const user = await authRepo.create(data);
        return user;
    } catch (err) {
        throw err;
    }
}
async function signIn(data) {
    try {
        email = data.email;
        const user = await authRepo.findUserByEmail(email);
        console.log(user);
        if (!user) {
            throw new AppError("Invalid email", StatusCodes.BAD_REQUEST);
        }
        if (!user.verified) {
            throw new AppError("User not verified", StatusCodes.BAD_REQUEST);
        }
        const isMatch = await comparePassword(data.password, user.password);

        if (!isMatch) {
            throw new AppError("Invalid password", StatusCodes.BAD_REQUEST);
        }

        return user;
    } catch (error) {

        throw new AppError(error.message, StatusCodes.BAD_REQUEST);
    }
}



async function generateToken(params) {
    try {
        const token = jwt.sign({ id: params._id, role:params.role }, serverConfig.JWT_SECRET_KEY, { expiresIn: serverConfig.JWT_EXPIRE });
        return token;
    } catch (err) {
        console.log("error in the create token", err);
        throw err;
    }
}

async function comparePassword(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
}

async function isAuthentication(token) {
    try {
        const decoded = jwt.verify(token, serverConfig.JWT_SECRET_KEY);
        console.log(decoded);

        const user = await authRepo.findUserById(decoded.id);
        return user;
    } catch (err) {
        console.log(err);

        throw new AppError("Invalid token", StatusCodes.UNAUTHORIZED);
    }
}


module.exports = {
    createUser,
    signIn,
    generateToken,
    isAuthentication,
    
}
