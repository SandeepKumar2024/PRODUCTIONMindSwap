//protected route
const verifyUserToken = (req, res, next) => {
    const jwtToken = req.headers.authorization;
    console.log("verifyUserToken",jwtToken)
    if (jwtToken) {
        const token = jwtToken.split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
            if (err) {
                return res.status(404).json({
                    message: "Unauthorized",
                    mes: err,
                });
            } else {
                req.user = decoded;
                console.log(decoded);
                next();
            }
        });
    } else {
        return res.status(404).json("Unauthorized , Token is invalid");
    }


};


module.exports = { verifyUserToken: verifyUserToken }