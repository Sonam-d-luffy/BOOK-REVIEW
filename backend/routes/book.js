import express from 'express'
import User from '../models/userModel.js'
import Book from '../models/bookModel.js'

const router = express.Router()

router.post('/:id/addBook' , async(req , res) => {
    try {
        const {title,author,description,genre,publishedYear} = req.body
        const {id} = req.params
        const user = await User.findById(id)
        if(!user) return res.status(404).json({message: 'No user'})
    let book = await Book.findOne({ title, author });
  const exist = await Book.findOne({user:user._id, title , author , publishedYear })
  if(exist) return res.status(400).json({message : 'You have already added this book'})
    if (book) {
      if (!book.users.includes(user._id)) {
        book.users.push(user._id);
        await book.save();
      }
    } else {
      book = new Book({
        title, author, description, genre, publishedYear, users: [user._id],
      });
      await book.save();
    }
        return res.status(200).json({message: 'Book saved successfully' , book : book})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Server Error'})
    }
})

router.get('/getBook' , async(req , res) => {
  try {
    const books = await Book.find()
    if(!books){
      return res.status(404).json({message: 'No book found'})
    }
    return res.status(200).json({message: 'Books are here' , books:books})
  } catch (error) {
    console.log(error)
    return res.status(500).json({message: 'Server Error'})
  }
})
// get
router.get('/:userId/yourBooks' , async(req , res) => {
  try {
    const {userId} = req.params
    const books = await Book.find({users:userId})
    if(!books) return res.status(404).json({message: 'Sorry you do not have any book uploaded'})
      return res.status(200).json({message: 'Your books' , books:books})
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server Error' })
  }
})
// Update 
router.put('/:bookId/edit', async (req, res) => {
  try {
    const { bookId } = req.params
    const { title, author, description, genre, publishedYear } = req.body

    const book = await Book.findById(bookId)
    if (!book) return res.status(404).json({ message: 'Book not found' })

    // Update fields if provided
    if (title) book.title = title
    if (author) book.author = author
    if (description) book.description = description
    if (genre) book.genre = genre
    if (publishedYear) book.publishedYear = publishedYear

    await book.save()
    return res.status(200).json({ message: 'Book updated successfully', book })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server Error' })
  }
})

// Delete 
router.delete('/:bookId/delete', async (req, res) => {
  try {
    const { bookId } = req.params
    const book = await Book.findByIdAndDelete(bookId)
    if (!book) return res.status(404).json({ message: 'Book not found' })
    return res.status(200).json({ message: 'Book deleted successfully' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server Error' })
  }
})

export default router