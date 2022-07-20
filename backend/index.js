const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const app = express();
const path = require("path");
const bookRouter = require('./routes/book')
const categoryRouter = require('./routes/categories')
const userRouter = require("./routes/user");

//mongodb+srv://Nabijon:973619177@freebooks.35vid.mongodb.net/?retryWrites=true&w=majority
mongoose
    .connect("mongodb://localhost:27017/free-books")
    .then(() => {
        console.log("MongoDB is connected....");
    })
    .catch((error) => console.log(`Connection Error..., ${error}`));

app.use(express.json());
app.use(bodyParser.json());
app.use(cors());
app.use('/api/books', bookRouter)
app.use('/api/categories', categoryRouter)
app.use("/api/user", userRouter);
app.use("/books", express.static("books/"));

//************* PORT ********************* */
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App listening - ${port}`);
});