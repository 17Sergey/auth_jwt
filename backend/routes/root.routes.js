const express = require('express');
const path = require('path');

const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../', '../', 'frontend', 'views', 'index.html'));
});

router.get(
    '/chain',
    async (req, res, next) => {
        console.log('Chained one');
        next();
    },
    async (req, res) => {
        console.log('Chained two');
    }
);

router.get('/red', async (req, res) => {
    res.status(301).redirect('/');
});

router.get('/getAll', async (req, res) => {
    res.status(301).json({ message: 'Data is loaded successfully' });
});

module.exports = router;
