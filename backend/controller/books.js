const { Book } = require('../models/book') 


exports.getBooks = async (req, res) => {
    const books = await Book.find();
    if (!books) {
        return res.status(404).json({
            message: "Books are empty",
        });
    }
    res.send(books)
}

exports.createBook = async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const book = new Book({
        title: req.body.title,
        description: req.body.description,
        categoryName: req.body.categoryName,
        image: url + /books/ + req.files.image[0].filename,
        file: url + /books/ + req.files.file[0].filename,
        bookSize: req.files.file[0].size
    });
    await book.save().then((book) => {
            res.status(201).json({
                message: "Successfully added",
                post: book,
            });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Something went wrong",
                error: error
            });
        });
};

exports.updateBook = async (req, res) => {
    let bookPath = req.body.bookPath;
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        bookPath = url + "/books/" + req.files.file[0].filename;
        
    }
    const book = await Book.findByIdAndUpdate(
        req.params.id,
        {
            title: req.body.title,
            description: req.body.description,
            categoryName: req.body.categoryName,
        },
        {
            new: true,
        }
    );
    if (!book) {
        return res.status(404).send("That type of id not found");
    }
    res.status(201).json({
        message: "book successfully updated",
    });
};

exports.deleteBook = async (req, res) => {
    const book = await Book.findByIdAndRemove(req.params.id);
    if (!book) {
        res.status(404).json({
            message: "post not found",
        });
    } else {
        res.status(200).json({
            message: "Post deleted Successfully",
            book: book,
        });
    }
};

exports.BookGetById = async (req, res) => {
    await Book.findById(req.params.id)
        .then((book) => {
            if (!book) {
                res.status(404).json({
                    message: "book not found",
                });
            }
            res.status(200).json(book);
        })
        .catch((error) => {
            res.status(500).json({
                message: "Fetching post failed!",
            });
        });
};
