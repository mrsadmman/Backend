const IS_ADMIN = true

module.exports = verifyRole = (req, res, next) => {
    if (!IS_ADMIN)
        return res.send({ error: "Access Denied" })
    else {
        console.log("Access Granted");
        next();
    }
};

