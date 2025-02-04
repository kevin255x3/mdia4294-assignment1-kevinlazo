
//import the express framework and create a router instance
const express = require('express');
const router = express.Router();

// book data - an array of book objects with the properities of id, title, author, release, genre, price and imageUrl
const books = [
    {
        id: 1,
        title: 'Grid Systems in Graphic Design',
        author: 'Josef Muller-Brockmann',
        year: 1981,
        genre: 'Design',
        price: '$93',
        imageUrl: 'images/book-1.jpg',
    },
    {
        id: 2,
        title: 'Thinking with Type: A critical guide for designers, writers, editors, & students (3rd Edition, Revised and Expanded)',
        author: 'Ellen Lupton',
        year: 2024,
        genre: 'Design',
        price: '$43',
        imageUrl: 'images/book-2.jpg',
    },
    {
        id: 3,
        title: 'Karma: A Yogi\'s Guide to Crafting Your Destiny',
        author: 'Sadghuru',
        year: 2021,
        genre: 'Spirituality',
        price: '$36',
        imageUrl: 'images/book-3.jpg',
    }
];

// middle ware
// function to find a book by id
// takes three parameters: req, res, and next
// req = request object, res = response object, next = next middleware function
function findBookById(req, res, next) {
    // convert the requested id to a number
    const requestedId = Number(req.params.id);
    // search for the book with the requested id in the books array.
    const bookData = books.find(book => book.id === requestedId);

    if (bookData !== undefined) {
        // if the book is found, attach the book data to the request object 
        req.book = bookData;
        // and continue
        next();
    } else {
        // if the book is not found, send a 404 error
        res.status(404).send('Book not found');
    }
}

// routes
// get request to /books - returns all books in the array(database)
router.get('/books', (req, res) => {
    res.json(books);
});

// get request to /books/:id - returns a single book by id
router.get('/books/:id', findBookById, (req, res) => {
    res.json(req.book);
});

// post request to /books - creates a new book but does not add it to the database unless the required fields are provided
router.post('/books', (req, res) => {
    // extract the title, author, imageUrl, and year (required) from the request body
    const { title, author, imageUrl, year } = req.body;

    // validation that all the required fields are provided
    if (!title || !author || !imageUrl || !year) {
        return res.status(400).json({ error: 'All fields (title, author, imageUrl, year) are required' });
    }

    // creates a new book object with an auto-generated id
    const newBook = {
        id: books.length + 1,
        title,
        author,
        imageUrl,
        year: Number(year),
        genre: req.body.genre || '', // not required
        price: req.body.price || '' // not required
    };
    // adds the new new book to the books array (database)
    books.push(newBook);
    res.status(201).json(newBook);
});

// put request to /books/:id - updates an exsisting book by id
router.put('/books/:id', findBookById, (req, res) => {
    // extracts all possible fields from the request body
    const { title, author, imageUrl, year, genre, price } = req.body;

    // checks that atleast one required field is being updated, which is valid
    if (!title && !author && !imageUrl && !year) {
        return res.status(400).json({
            error: 'At least one required field (title, author, imageUrl, year) must be provided'
        });
    }

    // if a year is provided, it must be a valid number
    if (year && !Number.isInteger(Number(year))) {
        return res.status(400).json({
            error: 'Year must be a valid number'
        });
    }

    // only updates the fields that are provided in the request body
    if (title) req.book.title = title;
    if (author) req.book.author = author;
    if (imageUrl) req.book.imageUrl = imageUrl;
    if (year) req.book.year = Number(year);
    if (genre) req.book.genre = genre;
    if (price) req.book.price = price;

    res.json(req.book);
});

// delete request to /books/:id - removes a book by id
router.delete('/books/:id', findBookById, (req, res) => {
    // finds the index of the book in the books array
    const bookIndex = books.findIndex(book => book.id === Number(req.params.id));
    // removes the book from the books array
    books.splice(bookIndex, 1);
    // send a 204 response (success) with no content
    res.status(204).send();
});
// export the router for use in the app.js file
module.exports = router;