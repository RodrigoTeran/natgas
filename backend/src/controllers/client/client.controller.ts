import type { IRegisterBody } from "./client.types";
import User from "../../models/User/user.model";

export const registerClient = async (req, res) => {
    try {
        const {
            username,
            height,
            weight,
            dateOfBirth,
            goal,
            level,
            sex
        }: IRegisterBody = req.body;

        if (
            username.trim() === "" ||
            height < 0 ||
            weight < 0 ||
            typeof dateOfBirth !== "object" ||
            goal.trim() === "" ||
            level.trim() === "" ||
            (sex !== "F" && sex !== "M")
        ) {
            return res.json({
                data: {},
                msg: "Los valores están mal",
                auth: true
            });
        }

        await User.register(
            req.user.id,
            username,
            sex,
            dateOfBirth,
            weight,
            height,
            goal,
            level
        );

        const user = await User.findById(req.user.id);

        return res.json({
            data: {
                user
            },
            msg: "",
            auth: true
        });
    } catch (error) {
        return res.json({
            data: {},
            msg: "",
            auth: true
        });
    }
}