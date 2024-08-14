module.exports = (req, res, next) => {
    console.log(
        `${req.method}  ${req.url}  ${req.headers.origin}  ${new Date().toLocaleDateString()}`
    );
    next();
};
