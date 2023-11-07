import UserSchema from '../models/UserSchema.js';
import TechnicianSchema from '../models/TechnicianSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = user => jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {
    expiresIn: '15d',
})

export const register = async (req,res) => {
    try {
        const {email, password, name, role, photo, gender} = req.body;
        let user = null;

        if (role === 'customer') {
            user = UserSchema.find({email})
        } else if (role === 'technician') {
            user = TechnicianSchema.find({email})
        }

        if(user) {
            return res.statusCode(400).json({message: 'User already exists'})
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        if (role === 'customer') {
            user = new UserSchema({
                name,
                email,
                password: hashPassword,
                role,
                photo,
                gender
            });
        }
        if (role === 'technician') {
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
            res.statusCode(200).json({success: true, message: 'User is created successfully'});
        } else {
            res.statusCode(500).json({success: false, message: 'Internal server error'});
        }

    } catch (e) {
        console.log('Error', e);
        res.statusCode(500).json({success: false, message: 'Internal server error'});
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
        if (!user) {
            return res.status(404).json({message: "User is not found"});
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if(!isPasswordMatch) {
            return res.status(400).json({status: false, message: "Invalid credentials"});
        }

        const token = generateToken(user);

        const {...rest} = user._doc

    } catch (e) {

    }
}