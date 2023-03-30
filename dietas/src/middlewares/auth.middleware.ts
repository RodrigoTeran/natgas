import User from "../models/User/user.model"

export const isAuth = async (req, res, next) => {
    const token = req.headers["authorization"];

    if (token === undefined || token === null) {
        return res.json({
            auth: false,
            msg: "Usuario no autenticado",
            data: {}
        });
    } else {
        const user = await User.findById(token);

        if (user === null) {
            return res.json({
                auth: false,
                msg: "Usuario no autenticado",
                data: {}
            });
        }

        req.user = user;
        return next();
    }
}