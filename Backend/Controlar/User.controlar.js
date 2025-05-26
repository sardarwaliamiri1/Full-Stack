import bcryptjs from "bcryptjs";
import User from '../Model/User.model.js';

export const test = (req, res) => {
    return res.json({
        message: "User controller is working",
    });
}

export const Update = async (req, res, next) => {
    const URLid = req.params.id;
    const jwtverifiedId = req.user.id;

    if (URLid !== jwtverifiedId) {
        return res.status(403).json({ message: "You can only update your own account" });
    }

    try {
        const updateData = {
            name: req.body.name,
            email: req.body.email,
        };

        if (req.body.password) {
            const hashedPassword = await bcryptjs.hash(req.body.password, 10);
            updateData.password = hashedPassword;
        }

        const updatedUser = await User.findByIdAndUpdate(jwtverifiedId, {
            $set: updateData,
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        next(error);
    }
}
