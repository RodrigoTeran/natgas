export const getAuth = (req, res) => {
    try {
        return res.json({
            auth: true,
            msg: "",
            data: {
                user: req.user
            }
        })
    } catch (error) {

    }
}