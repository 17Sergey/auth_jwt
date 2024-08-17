const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        const authHeader = req.headers['authorization'];
        if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

        const token = authHeader.split(' ')[1];

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (!decoded) return res.status(403).json({ error: 'Unauthorized: invalid token' });
        } catch (error) {
            return res.status(403).json({ error: error.message });
        }

        req.username = decoded.username;
        next();
    } catch (error) {
        console.log('Error in verifyToken: ' + error.message);
        return res.status(500).json({ error: `Internal server error` });
    }
};

module.exports = verifyToken;
