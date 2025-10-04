import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Context/UserContext'
import Navbar from '../Components/Navbar'
import Button from '../Components/Button'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import api from '../api'


const UserReview = () => {
  const { currentUser } = useContext(UserContext)
  const [reviews, setReviews] = useState([])
  const [message, setMessage] = useState('')
  const [editingReviewId, setEditingReviewId] = useState(null)
  const [formData, setFormData] = useState({ rating: '', reviewText: '' })
  const navigate = useNavigate()

  // Fetch all reviews for the current user
  const fetchReviews = async () => {
    if (!currentUser) return
    try {
      const res = await api.get(`/api/review/${currentUser._id}/yourReviews`
      )
      setReviews(res.data.reviews || [])
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Server Error')
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [currentUser])

  // Start editing a review
  const handleEdit = (review) => {
    setEditingReviewId(review.bookId)
    setFormData({ rating: review.rating, reviewText: review.reviewText })
  }

  // Update review
  const handleUpdate = async (bookId) => {
    try {
      await api.put(
        `/api/review/${currentUser._id}/${bookId}/edit`,
        formData
      )
      setMessage('Review updated successfully')
      setEditingReviewId(null)
      fetchReviews()
    } catch (error) {
      setMessage(error?.response?.data?.message || 'Server Error')
    }
  }

  // Delete review
  const handleDelete = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return
    try {
      await api.delete(
        `/api/review/${currentUser._id}/${bookId}/delete`
      )
      setMessage('Review deleted successfully')
      setReviews((prev) => prev.filter((r) => r.bookId !== bookId))
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
          title="Edit Reviews"
          buttonName="Back"
          onButtonClick={() => navigate(-1)}
          logo={assets.logo}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center pt-40 px-4 space-y-4">
        {message && <p className="text-red-500">{message}</p>}
        {reviews.length === 0 && <p className="text-white">No reviews found.</p>}

        <div className="flex flex-col gap-4 w-full max-w-xl">
          {reviews.map((review) => (
            <div
              key={review.bookId}
              className="bg-white/15 backdrop-blur-md p-4 rounded-lg flex flex-col gap-2"
            >
              {editingReviewId === review.bookId ? (
                <div className="flex flex-col gap-2">
                  <input
                    type="number"
                    name="rating"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={handleChange}
                    className="p-2 rounded border"
                  />
                  <input
                    type="text"
                    name="reviewText"
                    value={formData.reviewText}
                    onChange={handleChange}
                    className="p-2 rounded border"
                  />
                  <div className="flex gap-2 mt-2">
                    <Button onClick={() => handleUpdate(review.bookId)} text="Save" />
                    <Button onClick={() => setEditingReviewId(null)} text="Cancel" />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  <p>
                    <strong>Rating:</strong> {review.rating}
                  </p>
                  <p>
                    <strong>Review:</strong> {review.reviewText}
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Button onClick={() => handleEdit(review)} text="Edit" />
                    <Button onClick={() => handleDelete(review.bookId)} text="Delete" />
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

export default UserReview
