import UserSchema from '../models/UserSchema.js';
import TechnicianSchema from '../models/TechnicianSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {Roles} from "../types/types.js";

const generateToken = user => jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {
    expiresIn: '15d',
})

export const register = async (req,res) => {
    try {
        const {email, password, name, role, photo, gender} = req.body;
        let user = null;

        if (role === Roles.CUSTOMER) {
            user = await UserSchema.find({email});
        } else if (role === Roles.TECHNICIAN) {
            user = await TechnicianSchema.find({email});
        }
console.log("user @@@@@@@@@@@@@@", user)
        if(user && user.length > 0) {
            return res.status(400).json({message: 'User already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if (role === Roles.CUSTOMER) {
            user = new UserSchema({
                name,
                email,
                password: hashPassword,
                role,
                photo,
                gender
            });
        }
        if (role === Roles.TECHNICIAN) {
            user = new TechnicianSchema({
                name,
                email,
                password: hashPassword,
                role,
                photo,
                gender
            });
        }

        if (user) {
            await user.save();
            res.status(200).json({success: true, message: 'User is created successfully'});
        } else {
            res.status(500).json({success: false, message: 'Internal server error'});
        }

    } catch (e) {
        console.log('Error', e);
        res.status(500).json({success: false, message: 'Internal server error'});
    }
}

export const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        let user = null;

        const customer = await UserSchema.findOne({email});
        const technician = await TechnicianSchema.findOne({email});

        if(customer) {
            user = customer;
        }
        if(technician) {
            user = technician;
        }
        console.log("customer", customer)
        console.log("technician", technician)

        if (!user) {
            return res.status(404).json({message: "User is not found"});
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch) {
            return res.status(400).json({status: false, message: "Invalid credentials"});
        }

        const token = generateToken(user);

        const {role, ...rest} = user._doc;

        return res.status(200).json({status: true, message: "Logged in successfully", token, role, data: {...rest}});

    } catch (e) {
        return res.status(500).json({status: false, message: "Login failed"});
    }
}