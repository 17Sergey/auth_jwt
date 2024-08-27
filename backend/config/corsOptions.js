const whiteList = ['https://www.google.com', 'https://www.youtube.com', 'http://localhost:5173'];

const devOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

const prodOptions = {
    origin: function (origin, callback) {
        if (whiteList.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
};

const corsOptions = process.env.NODE_ENV === 'development' ? devOptions : prodOptions;

module.exports = corsOptions;
