const { SuccessResponse, ErrorResponse } = require("../utils/common");
const { StatusCodes } = require("http-status-codes");
const { AuthService } = require("../services");

async function register(req,res) {
    try {
        const data={
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }
        const user=await AuthService.createUser(data);
        SuccessResponse.data=user;
        SuccessResponse.message="User Registered successfully";
        return res.status(StatusCodes.OK).json(SuccessResponse);
        
    } catch (err) {
        console.log(err);
        ErrorResponse.error = err;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}


async function login(req,res) {
    try {
        const data={
            email:req.body.email,
            password:req.body.password
        }
        const user=await AuthService.signIn(data);
        if(user){
            const token=await AuthService.generateToken(user);
            SuccessResponse.data={user,token};
            SuccessResponse.message="User logged in successfully";
            // SuccessResponse.data.token=token;
            return res.status(StatusCodes.OK).json(SuccessResponse);
        }
        ErrorResponse.message="Invalid credentials";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        
    } catch (err) {
        console.log(err);
        ErrorResponse.error=err;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}


async function adminLogin(req,res) {
    try {
        const data={
            email:req.body.email,
            password:req.body.password
        }
        const user=await AuthService.signIn(data);
        if(user){
            const token=await AuthService.generateToken(user);
            SuccessResponse.data={user,token};
            SuccessResponse.message="User logged in successfully";
            return res.status(StatusCodes.OK).json(SuccessResponse);
        }
        ErrorResponse.message="Invalid credentials";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        
    } catch (err) {
        console.log(err);
        ErrorResponse.error=err;
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
}



module.exports={
    login,
    register,
    adminLogin,
}

