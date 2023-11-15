import ReviewSchema from "../models/ReviewSchema.js";
import TechnicianSchema from "../models/TechnicianSchema.js";


export const getAllReviews = async (req, res) => {
    try {
        const data = await ReviewSchema.find().select('-password -__v');
        return res.status(200).json({success: true, message: "Reviews are found", data});
    } catch (e) {
        return res.status(404).json({success: false, message: "Failed to find Reviews"});
    }
};

export const createReview = async (req, res) => {

}