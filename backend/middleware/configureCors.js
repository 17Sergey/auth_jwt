const cors = require('cors');

const configureCors = () => {
    if (process.env.NODE_ENV === 'development') {
        return cors();
    } else {
        const whiteList = ['https://www.google.com', 'https://www.youtube.com'];
        var corsOptions = {
            origin: function (origin, callback) {
                if (whiteList.indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    callback(new Error('Not allowed by CORS'));
                }
            },
        };

        return cors(corsOptions);
    }
};

module.exports = configureCors;
