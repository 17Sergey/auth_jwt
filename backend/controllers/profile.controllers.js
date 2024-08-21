const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data) {
        this.users = data;
    },
};

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUserProfile = async (req, res) => {
    try {
        const username = req.params.username;
        if (!username)
            return res.status(400).json({ error: 'Bad request: Send username as a parameter' });

        const user = usersDB.users.find((user) => user.username === username);
        if (!user) return res.status(404).json({ error: 'User not found' });

        return res
            .status(200)
            .json({ username: user.username, loggedIn: new Date().toUTCString() });
    } catch (error) {}
};

module.exports = { getUserProfile };
