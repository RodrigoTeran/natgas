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

<<<<<<< HEAD
        if (user === null) {
            return res.json({
                auth: false,
                msg: "Usuario no autenticado",
                data: {}
            });
        }

=======
>>>>>>> cc34379 (medidas-backend-v1)
        req.user = user;
        return next();
    }
}