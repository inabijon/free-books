const express = require("express");
const router = express.Router();
const file = require("../middleware/file");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Book } = require('../models/book')


const bookController = require('../controller/books')

router.get("", bookController.getBooks); 

// ****************GET IELTS Books*******************
router.get("/ielts", async (req, res) => {
    let ielts = await Book.find({ categoryName: /^IELTS/ })
    if (!ielts) {
        res.json({ message: "Books no !" });
    }
    res.send(ielts);
})

// ****************GET Programming Books*******************
router.get("/programming", async (req, res) => {
    let programming = await Book.find({ categoryName: /^Programming/ })
    if (!programming) {
        res.json({ message: "Books no !" });
    }
    res.send(programming);
})

// ****************GET Art Books*******************
router.get("/art", async (req, res) => {
    let art = await Book.find({ categoryName: /^Art/ })
    if (!art) {
        res.json({ message: "Books no !" });
    }
    res.send(art);
})

// *************************** GET PROGRAMMING BOOKS VIA CATEGORY NAME******************
router.get("/programming/frontend", async (req, res) => {
    let frontend = await Book.find({ categoryName: "Programming frontend" });
    if (!frontend) {
        res.json({ message: "Books no !" });
    }
    res.send(frontend);
});

router.get("/programming/backend", async (req, res) => {
    let backend = await Book.find({ categoryName: "Programming backend" });
    if (!backend) {
        res.json({ message: "Books no !" });
    }
    res.send(backend);
});

// *************************** GET IELTS BOOKS VIA CATEGORY NAME******************
router.get("/ielts/speaking", async (req, res) => {
    let speaking = await Book.find({ categoryName: "IELTS speaking" });
    if (!speaking) {
        res.json({ message: "Books no !" });
    }
    res.send(speaking);
});

router.get("/ielts/writing", async (req, res) => {
    let writing = await Book.find({ categoryName: "IELTS writing" });
    if (!writing) {
        res.json({ message: "Books no !" });
    }
    res.send(writing);
});

router.get("/ielts/listening", async (req, res) => {
    let listening = await Book.find({ categoryName: "IELTS listening" });
    if (!listening) {
        res.json({ message: "Books no !" });
    }
    res.send(listening);
});

router.get("/ielts/reading", async (req, res) => {
    let reading = await Book.find({ categoryName: "IELTS reading" });
    if (!reading) {
        res.json({ message: "Books no !" });
    }
    res.send(reading);
});

router.get("/ielts/vocabulary", async (req, res) => {
    let vocabulary = await Book.find({ categoryName: "IELTS vocabulary" });
    if (!vocabulary) {
        res.json({ message: "Books no !" });
    }
    res.send(vocabulary);
});

// *************************** GET ART BOOKS VIA CATEGORY NAME******************
router.get("/art/literature", async (req, res) => {
    let literature = await Book.find({ categoryName: "Art literature" });
    if (!literature) {
        res.json({ message: "Books no !" });
    }
    res.send(literature);
});

router.get("/art/historical", async (req, res) => {
    let historical = await Book.find({ categoryName: "Art historical" });
    if (!historical) {
        res.json({ message: "Books no !" });
    }
    res.send(historical);
});

// *****************GET SORT BY SEARCH****************************

router.get("/search/:key", async (req, res) => {
    const books = await Book.find({
        $or: [{ title: { $regex: req.params.key } }],
    });
    if (!books) {
        res.status(404).json({
            message: 'No result'
        })
    }
    res.send(books);
});


router.get("/:id", bookController.BookGetById)

router.post("", file, async (req, res) => {
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
})

router.put("/:id", file, bookController.updateBook)

router.delete("/:id", bookController.deleteBook)

// ********************* Get All IELTS book* ******************************

module.exports = router;