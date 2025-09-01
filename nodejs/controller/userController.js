const Users = require('./../model/userSchema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
exports.Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ _id: user._id }, "SECRET_KEY", {
            expiresIn: '1h'
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(400).json('API Error' + error)
    }
}

exports.createUser = async (req, res) => {
    const { name, email, password, confirm_password, role } = req.body;
    const file = req.file;
    try {
        const user = await Users.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        // Return error if confirm_password missing
        if (!confirm_password) {
            return res.status(400).json({ message: "confirm_password is required" });
        }
        // Optional: Check if password and confirm_password match
        if (password !== confirm_password) {
            return res.status(400).json({ message: "Passwords do not match" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // Save file path or URL in user document if file uploaded
        const imagePath = file ? `http://localhost:5000/upload/${file.filename}` : undefined;
        Users.create({ name, email, password: hashedPassword, confirm_password, role, image: imagePath });
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(400).json('API Error' + error)
    }
}


exports.getUsers = async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);

    } catch (error) {
        res.status(400).json('API Error' + error)
    }
}


exports.getByIdUsers = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);

    } catch (error) {
        res.status(400).json('API Error' + error)
    }
}

exports.getByIdUsersDelete = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await Users.findByIdAndDelete(id);
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(400).json('API Error' + error)
    }
}

exports.getByIdUsersUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        await Users.findByIdAndUpdate(id, { ...req.body }, { new: true });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json('API Error' + error)
    }
}