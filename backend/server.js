const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const path = require('path');

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const configureCors = require('./middleware/configureCors');

const rootRouter = require('./routes/root.routes');
const authRouter = require('./routes/auth.routes');
const refreshRouter = require('./routes/refresh.routes');
const profileRouter = require('./routes/profile.routes');
const verifyToken = require('./middleware/verifyToken');

const app = express();

dotenv.config();

// Middleware

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

app.use('/', express.static(path.join(__dirname, '../', '/frontend', '/public')));

app.use(logger);

// Cross Origin Resource Sharing
app.use(configureCors());

// Routes

app.use('/', rootRouter);
app.use('/api/auth', authRouter);
app.use('/api/profile', profileRouter);
app.use('/api/refresh', refreshRouter);

app.get('/api/music', async (req, res) => {
    res.status(200).json({
        songs: [
            {
                id: 1,
                artist: 'Miyagi',
                name: 'Половина моя',
            },
            {
                id: 2,
                artist: 'Ария',
                name: 'Потерянный рай',
            },
            {
                id: 3,
                artist: 'Miyagi',
                name: 'Наполняй',
            },
        ],
    });
});

app.get('/*', async (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '../', 'frontend', 'views', '404.html'));
});

app.use(errorHandler);

const PORT = process.env.PORT || 5500;

app.listen(PORT, () => {
    console.log(`Server is running: http://localhost:${PORT}`);
});
