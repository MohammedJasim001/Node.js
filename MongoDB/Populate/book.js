const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/populate-example', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Define the Author Schema
const authorSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Author = mongoose.model('Author', authorSchema);

// Define the Book Schema with reference to Author
const bookSchema = new mongoose.Schema({
  title: String,
  pages: Number,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author' // Reference to the Author collection
  }
});

const Book = mongoose.model('Book', bookSchema);

// Add a new author
app.post('/add-author', async (req, res) => {
  try {
    const { name, age } = req.body;
    const newAuthor = new Author({ name, age });
    await newAuthor.save();
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new book
app.post('/add-book', async (req, res) => {
  try {
    const { title, pages, authorId } = req.body;
    const newBook = new Book({
      title,
      pages,
      author: authorId  // Reference to the existing author by ID
    });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a book and populate the author details
app.get('/books/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('author'); // Populate author details
    if (!book) return res.status(404).json({ message: 'Book not found' });

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all books with populated author details
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find().populate('author'); // Populate author details for all books
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
