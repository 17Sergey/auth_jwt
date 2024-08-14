const usersDB = {
    users: require('../models/users.json'),
    setUsers: function (data) {
        this.users = data;
    },
};

const jwt = require('jsonwebtoken');

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.jwt2;
        if (!refreshToken) return res.status(400).json({ error: 'No token provided' });

        const foundUser = usersDB.users.find((person) => person.refreshToken === refreshToken);
        if (!foundUser) return res.status(403).json({ error: 'Access forbidden: no user found' });

        const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        if (!decoded || decoded.username !== foundUser.username) {
            return res.status(403).json({ error: 'Access forbidden: invalid token' });
        }

        // Generate a new one
        const accessToken = jwt.sign(
            { username: decoded.username },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30s' }
        );

        return res.status(200).json({ accessToken });
    } catch (error) {
        console.log('Error in refreshToken controller: ', error.message);
        return res.status(500).json({ error: error.message });
    }
};

module.exports = { refreshToken };
