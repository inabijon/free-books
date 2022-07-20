const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const _ = require("lodash")


exports.users = async (req, res) => {
    const users = await User.find();
    res.send(users);
}

exports.createUser = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash,
            });

            user.save().then((result) => {
                res.status(201).json({
                    message: "User successfully created",
                    user: result,
                });
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "User exist !",
            });
        });
}

exports.userLogin = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    message: "Email or password error",
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then((result) => {
            if (!result) {
                return res.status(401).json({
                    message: "Email or password error",
                });
            }
            const token = jwt.sign(
                { email: fetchedUser.email, userId: fetchedUser._id, isAdmin: fetchedUser.isAdmin },
                "my_free_books_website_secret_token",
                { expiresIn: "1h" }
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                message: "Successfully Login",
            });
        })
        .catch((err) => {
            return res.status(401).json({
                message: "Auth failed",
                error: err,
            });
        });
};
