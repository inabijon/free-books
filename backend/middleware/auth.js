const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Token does't exist",
            });
        }
        const decoded = jwt.verify(token, "my_free_books_website_secret_token");
        req.user = decoded;
        next();
    } catch (ex) {
        return res.status(400).json({ message: "Auth failed!", error: ex.message });
    }
};
