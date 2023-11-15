import TechnicianSchema from "../models/TechnicianSchema.js";

export const getAllTechnicians = async (req, res) => {
    try {
        const {query} = req;
        let data;
        if (Object.keys(query).length > 0) {
            data = await TechnicianSchema.find({
                $or: [
                    {name: {$regex: query.search, $options: 'i'}},
                    {specialization: {$regex: query.search, $options: 'i'}},
                ]
            }).select('-password -__v');
        } else {
            data = await TechnicianSchema.find().select('-password -__v');
        }
        return res.status(200).json({success: true, message: "Technicians are found", data});
    } catch (e) {
        return res.status(404).json({success: false, message: "Failed to find Technicians"});
    }
};
export const getTechnicianById = async (req, res) => {
    try {
        const data = await TechnicianSchema.findById(req.params.id).select('-password -__v');
        if (!data) {
            return res.status(404).json({status: false, message: "Failed to find a Technician"});
        }
        return res.status(200).json({success: true, message: "Technician is found", data});
    } catch (e) {
        return res.status(404).json({success: false, message: "Failed to find a Technician"});
    }
};
export const updateTechnician = async (req, res) => {
    try {
        const data = await TechnicianSchema.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true}).select('-password -__v');
        return res.status(200).json({success: true, message: "Technician is updated", data});
    } catch (e) {
        return res.status(500).json({success: false, message: "Failed to update Technician"})
    }
};

export const deleteTechnician = async (req, res) => {
    try {
        await TechnicianSchema.findByIdAndDelete(req.params.id);
        return res.status(200).json({success: true, message: "Technician is deleted"});
    } catch (e) {
        return res.status(500).json({success: false, message: "Failed to delete Technician"})
    }
};