const UserModal = require("../models/User.model")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await UserModal.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User name is already existing" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModal({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error while registeraion please try again later" });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModal.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }
        const isPasswordOK = await bcrypt.compare(password, user.password);
        if (!isPasswordOK) {
            return res.status(400).json({ message: "Wrong password" });
        }
        const token = jwt.sign(
            { userId: user._id, 
            role: user.role 
        }, 
        process.env.JWT_SECRET
        )
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await UserModal.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users" });
    }
};

module.exports = {
    register,
    login,
    getUsers
}