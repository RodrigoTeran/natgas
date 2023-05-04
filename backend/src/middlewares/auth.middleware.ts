import User from "../models/User/user.model"

export const isAuth = async (req, res, next) => {
    try {
        const token = req.headers["authorization"];

    if (token === undefined || token === null) {
        return res.json({
            auth: false,
            msg: "Usuario no autenticado",
            data: {
                user: null
            }
        });
    } else {
        const user = await User.findById(token);

        if (user === null) {
            return res.json({
                auth: false,
                msg: "Usuario no autenticado",
                data: {
                    user: null
                }
            });
        }

        req.user = user;
        return next();
    }
        
    } catch (error) {
        console.log(error)
    }
    
}