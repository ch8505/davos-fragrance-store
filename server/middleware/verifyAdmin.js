
const verifyAdmin = (req, res, next) => {
    const { role } = req.user
    if (role != "Admin") {
        res.status(401).json({ message: "Action unavailable" })
    }
    else {
        next()
    }
}

module.exports = verifyAdmin