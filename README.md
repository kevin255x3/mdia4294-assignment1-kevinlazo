Hi Airrick, 

I have deleted the node_modules folder, in order to have the project work as expected please run the command npm install in cli.
I updated the json file to run the server with the command npm run dev. npx expo start will work too. 

I added additional properties to the books objects in the array. 
The default mount on the books router is set to /api, running at the port http://localhost:3000.

GET requests to http://localhost:3000/api/books - will return all the books in the database
GET requests to http://localhost:3000/api/books/:id - will return the data of the book assigned to the specific id in the if it is available in the database.

POST requests to http://localhost:3000/api/books - will create a new book object in the database but it is required that you provide a title, author, imageURL, and year properties in your raw body JSON request otherwise the object will not be created.
PUT requests to http://localhost:3000/api/books/:id - will update an exsisting book in the database with the specific id that you query. You need to update at least one of the required fields, title, author, imageURL, and year properties for the PUT request to successfully update the information of the book object.
DELETE requests to http://localhost:3000/api/books/:id - will delete the data of the exsisting book with the specific id you query from the database.

MDIA 4294 - Assignment One
Kevin Lazo - A01398803



