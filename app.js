// required packages and modules
const express = require('express'); // express framework
const app = express(); // creates an express applicatiom
const port = 3000; // our server port
const booksRouter = require('./routes/books'); // our books router
const bodyParser = require('body-parser'); // our middleware for parsing json requests (raw body requests)
const path = require('path'); // our path module (node.js) for working with file paths

// middleware

// enables parsing of JSON data in request body
app.use(bodyParser.json());
// enables service of static files (our imageURLs) from the public directory
app.use(express.static('public'));

// mount our books router at /api (localhost:3000/api)
app.use('/api', booksRouter);

// server
app.listen(port, () => {
    // console messages signifying that the server is running
    console.log(`Server is running at http://localhost:${port}`);
})