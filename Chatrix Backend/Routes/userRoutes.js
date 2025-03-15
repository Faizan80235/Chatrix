
const express = require('express');
const router = express.Router();
const User = require('../Models/User');

// ✅ Register User
router.post('/', async (req, res) => {
    const { name, email } = req.body;
    try {
        const user = await User.create({ name, email });
        res.status(201).json({ message: 'User registered', data: user });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed', error: error.message });
    }
});

// ✅ Get All Users (excluding current user)
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const users = await User.find({ _id: { $ne: id } }); // Exclude current user
        res.status(200).json({ message: 'Users fetched', data: users });
    } catch (error) {
        res.status(500).json({ message: 'Fetching users failed', error: error.message });
    }
});

module.exports = router;
