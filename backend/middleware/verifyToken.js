const jwt = require('jsonwebtoken');

const usersDB = require('../models/users.json');

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        console.log(authHeader);

        if (!authHeader)
            return res.status(401).json({ error: 'Unauthorized: No auth header provided' });

        const token = authHeader.split(' ')[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (!decoded) return res.status(403).json({ error: 'Unauthorized: invalid token' });
        } catch (error) {
            return res.status(401).json({ error: error.message });
        }

        const user = usersDB.find((user) => user.username === decoded.username);
        if (!user) return res.status(401).json({ error: 'Unauthorized: username does not exist' });

        req.username = user.username;
        next();
    } catch (error) {
        console.log('Error in verifyToken: ' + error.message);
        return res.status(500).json({ error: `Internal server error` });
    }
};

module.exports = verifyToken;
