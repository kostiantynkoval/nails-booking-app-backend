import jwt from 'jsonwebtoken';
import TechnicianSchema from "../models/TechnicianSchema.js";
import UserSchema from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
    const authToken = req.headers.authorization;

    if (!authToken?.startsWith("Bearer ")) {
        return res.status(401).json({status: false, message: "Not authenticated"});
    }
    
    try {
        const token = authToken.split(" ")[1];

        const decoded = jwt.decode(token, process.env.JWT_SECRET);
        console.log("decoded", decoded)
        req.userId = decoded.id;
        req.userRole = decoded.role;

        next();
    } catch (e) {
        if(e.name === "TokenExpiredError") {
            return res.status(401).json({status: false, message: "Token is expired"});
        }
        return res.status(401).json({status: false, message: "Invalid Token"});
    }
}

export const restrictByRole = roles => async (req, res, next) => {
    const userId = req.userId;
    let user = null;

    const customer = await UserSchema.findById(userId).select('role');
    const technician = await TechnicianSchema.findById(userId).select('role');

    if(customer) {
        user = customer;
    }
    if(technician) {
        user = technician;
    }

    if (!roles.includes(user?.role)) {
        return res.status(401).json({success: false, message: "Not authorized"})
    }

    next();
}