import UserSchema from "../models/UserSchema.js";

export const getAllUsers = async (req, res) => {
    try {
        const data = await UserSchema.find().select('-password -__v');
        return res.status(200).json({success: true, message: "Users are found", data});
    } catch (e) {
        return res.status(404).json({success: false, message: "Failed to find users"});
    }
};
export const getUserById = async (req, res) => {
    try {
        const data = await UserSchema.findById(req.params.id).select('-password -__v');
        if(!data) {
            return res.status(404).json({status: false, message: "Failed to find a user"});
        }
        return res.status(200).json({success: true, message: "User is found", data});
    } catch (e) {
        return res.status(404).json({success: false, message: "Failed to find a user"});
    }
};
export const updateUser = async (req, res) => {
    try {
        const data = await UserSchema.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).select('-password -__v');
        return res.status(200).json({success: true, message: "User is updated", data});
    } catch (e) {
        return res.status(500).json({success: false, message: "Failed to update user"})
    }
};

export const deleteUser = async (req, res) => {
    try {
        await UserSchema.findByIdAndDelete(req.params.id);
        return res.status(200).json({success: true, message: "User is deleted"});
    } catch (e) {
        return res.status(500).json({success: false, message: "Failed to delete user"})
    }
};