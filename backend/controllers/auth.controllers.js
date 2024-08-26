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

const signUp = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password)
            return res.status(400).json({ error: 'No username or password provided' });

        const userExists = usersDB.users.find((user) => user.username === username);
        if (userExists) return res.status(400).json({ error: 'User already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = {
            username,
            password: hashedPassword,
        };

        usersDB.setUsers([...usersDB.users, newUser]);

        await fsPromises.writeFile(
            path.join(__dirname, '../', 'models', 'users.json'),
            JSON.stringify(usersDB.users)
        );

        return res.status(201).json({ username });
    } catch (error) {
        console.log('Error in signup controller: ', error.message);
        return res.status(500).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password)
            return res.status(400).json({ error: 'No username or password provided' });

        const existingUser = usersDB.users.find((user) => user.username === username);
        if (!existingUser) return res.status(400).json({ error: 'User not found' });

        const passwordMatched = await bcrypt.compare(password, existingUser.password);

        if (passwordMatched) {
            // Set cookie
            const accessToken = jwt.sign(
                { username: existingUser.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '60s' }
            );
            const refreshToken = jwt.sign(
                { username: existingUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            const otherUsers = usersDB.users.filter(
                (user) => user.username !== existingUser.username
            );
            const currentUser = { ...existingUser, refreshToken };
            usersDB.setUsers([...otherUsers, currentUser]);
            await fsPromises.writeFile(
                path.join(__dirname, '../', 'models', 'users.json'),
                JSON.stringify(usersDB.users)
            );

            // Generate cookies
            res.cookie('jwt2', refreshToken, {
                maxAge: 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: 'strict', // CSRF attacks
            });
            return res.status(200).json({ username, accessToken });
        } else {
            return res.status(401).json({ error: 'Wrong username or password provided' });
        }
    } catch (error) {
        console.log('Error in login controller: ', error.message);
        return res.status(500).json({ error: error.message });
    }
};

const logout = async (req, res) => {
    // On client, also delete access token
    try {
        const refreshToken = req.cookies.jwt2;
        if (!refreshToken) return res.status(200).json({ message: 'Logged out successfully' });

        const foundUser = usersDB.users.find((person) => person.refreshToken === refreshToken);
        if (!foundUser) {
            res.cookie('jwt2', '', { maxAge: 0 });
            return res.status(200).json({ message: 'Logged out successfully' });
        }

        // Delete refresh token

        const otherUsers = usersDB.users.filter(
            (user) => user.refreshToken !== foundUser.refreshToken
        );
        const currentUser = { ...foundUser, refreshToken: null };
        usersDB.setUsers([...otherUsers, currentUser]);

        await fsPromises.writeFile(
            path.join(__dirname, '../', 'models', 'users.json'),
            JSON.stringify(usersDB.users)
        );

        res.cookie('jwt2', '', { maxAge: 0 });
        res.status(200).json({
            message: 'Logged out successfully',
        });
    } catch (error) {
        console.error(`Error in login controller ${error.message}`);
        res.status(500).json({ error: 'Server error' });
    }
};

const getMe = async (req, res) => {
    const user = req.user;
    return res.status(200).json(user);
};

module.exports = { signUp, login, logout, getMe };
