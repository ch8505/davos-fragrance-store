const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const login = async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const foundUser = await User.findOne({ username }).lean()
    if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
    const match = await bcrypt.compare(password, foundUser.password)
    if (!match) return res.status(401).json({ message: 'Unauthorized' })
    const userInfo = { _id: foundUser._id, name: foundUser.name, role: foundUser.role, username: foundUser.username, email: foundUser.email }
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    res.json(accessToken)
}

const register = async (req, res) => {
    const { username, password, name, email, phone, role } = req.body
    if (!name || !username || !password)
        return res.status(400).json({ message: 'some fields are required' })
    const duplicate = await User.findOne({ username }).lean()
    if (duplicate)
        return res.status(409).json({ message: "Duplicate username" })
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = { name, email, username, phone, password: hashedPwd, role }
    const user = await User.create(userObject)
    if (user) {
        const userInfo = { _id: user._id, name: user.name, role: user.role, username: user.username, email: user.email }
        const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
        res.json(accessToken)
    }
    else
        return res.status(400).json({ message: 'Invalid user received' })
}

module.exports = { login, register }