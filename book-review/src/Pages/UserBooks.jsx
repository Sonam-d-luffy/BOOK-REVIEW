import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import Navbar from '../Components/Navbar'
import Button from '../Components/Button'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import api from '../api'


const UserBooks = () => {
  const { currentUser } = useContext(UserContext)
  const [books, setBooks] = useState([])
  const [message, setMessage] = useState('')
  const [editingBookId, setEditingBookId] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    publishedYear: '',
  })
  const navigate = useNavigate()

  // Fetch all books for current user
  const fetchBooks = async () => {
    if (!currentUser) return
    try {
      const res = await api.get(
        `/api/books/${currentUser._id}/yourBooks`
      )
      setBooks(res.data.books || [])
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Server Error')
    }
  }

  useEffect(() => {
    fetchBooks()
  }, [currentUser])

  // Start editing a book
  const handleEdit = (book) => {
    setEditingBookId(book._id)
    setFormData({
      title: book.title,
      author: book.author,
      description: book.description,
      genre: book.genre,
      publishedYear: book.publishedYear,
    })
  }

  // Update book
  const handleUpdate = async (bookId) => {
    try {
      await api.put(
        `/api/books/${bookId}/edit`,
        formData
      )
      setMessage('Book updated successfully')
      setEditingBookId(null)
      fetchBooks()
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Server Error')
    }
  }

  // Delete book
  const handleDelete = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return
    try {
      await api.delete(
        `api/books/${bookId}/delete`
      )
      setMessage('Book deleted successfully')
      setBooks((prev) => prev.filter((b) => b._id !== bookId))
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Server Error')
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  return (
    <div className="relative min-h-screen w-full">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm -z-20 pointer-events-none"
        style={{ backgroundImage: `url(${assets.b1})` }}
      ></div>
      <div className="absolute inset-0 bg-black/20 -z-20 pointer-events-none"></div>

      {/* Navbar */}
      <div className="relative z-30">
        <Navbar
          title="Your Books"
          buttonName="Back"
          onButtonClick={() => navigate(-1)}
          logo={assets.logo}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pt-40 px-4 space-y-4">
        {message && <p className="text-red-500">{message}</p>}
        {books.length === 0 && <p className="text-white">No books found.</p>}

        <div className="flex flex-col gap-4 w-full max-w-xl">
          {books.map((book) => (
            <div
              key={book._id}
              className="bg-white/15 backdrop-blur-md p-4 rounded-lg flex flex-col gap-2"
            >
              {editingBookId === book._id ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="p-2 rounded border"
                  />
                  <input
                    type="text"
                    name="author"
                    value={formData.author}
                    onChange={handleChange}
                    placeholder="Author"
                    className="p-2 rounded border"
                  />
                  <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    className="p-2 rounded border"
                  />
                  <input
                    type="text"
                    name="genre"
                    value={formData.genre}
                    onChange={handleChange}
                    placeholder="Genre"
                    className="p-2 rounded border"
                  />
                  <input
                    type="number"
                    name="publishedYear"
                    value={formData.publishedYear}
                    onChange={handleChange}
                    placeholder="Published Year"
                    className="p-2 rounded border"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button onClick={() => handleUpdate(book._id)} text="Save" />
                    <Button onClick={() => setEditingBookId(null)} text="Cancel" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <p>
                    <strong>Title:</strong> {book.title}
                  </p>
                  <p>
                    <strong>Author:</strong> {book.author}
                  </p>
                  <p>
                    <strong>Description:</strong> {book.description}
                  </p>
                  <p>
                    <strong>Genre:</strong> {book.genre}
                  </p>
                  <p>
                    <strong>Published Year:</strong> {book.publishedYear}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button onClick={() => handleEdit(book)} text="Edit" />
                    <Button onClick={() => handleDelete(book._id)} text="Delete" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserBooks
