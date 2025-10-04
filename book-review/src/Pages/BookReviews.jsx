import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import assets from '../assets/assets'
import api from '../api'


const BookReviews = () => {
  const { bookId } = useParams()
  const [message, setMessage] = useState('')
  const [reviews, setReviews] = useState([])
  const [overallRating, setOverallRating] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await api.get(`/api/review/book/${bookId}/reviews`)
        setReviews(res.data.reviews || [])
        setOverallRating(res.data.overallRating || 0)
      } catch (error) {
        setMessage(error?.response?.data?.message || 'Server Error')
      }
    }
    fetchReviews()
  }, [bookId])

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating)
    const halfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0)
    return (
      <>
        <span className="text-pink-500">{'★'.repeat(fullStars)}</span>
        {halfStar && <span className="text-pink-500">☆</span>}
        <span className="text-pink-500">{'☆'.repeat(emptyStars)}</span>
      </>
    )
  }

  return (
    <div className="relative min-h-screen">
      {/* Blurry background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-sm -z-10"
        style={{ backgroundImage: `url(${assets.b2})` }}
      ></div>
      <div className="absolute inset-0 bg-black/20 -z-10"></div>

      {/* Navbar */}
      <div className="w-full z-20">
        <Navbar
          title={'Book Reviews'}
          logo={assets.logo}
          buttonName={'Back'}
          onButtonClick={() => navigate(-1)}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center pt-40 px-3 sm:px-6 md:px-8 space-y-4">
        {message && <p className="text-red-600 text-sm sm:text-base">{message}</p>}

        {/* Overall Rating */}
        <div className="text-base sm:text-lg md:text-xl font-bold text-white flex items-center space-x-2">
          <span>Overall Rating: {overallRating.toFixed(1)} / 5</span>
          <span>{renderStars(overallRating)}</span>
        </div>

        {/* Reviews List */}
        {reviews.length > 0 ? (
          <div className="flex flex-col gap-2 w-full max-w-md sm:max-w-lg md:max-w-xl">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white/15 backdrop-blur-sm p-3 rounded-lg shadow-md break-words"
              >
                <div className="text-sm sm:text-base font-semibold flex items-center gap-1">
                  {renderStars(review.rating)} <span>({review.rating})</span>
                </div>
                <div className="text-sm sm:text-base mt-1">Review: {review.reviewText}</div>
              </div>
            ))}
          </div>
        ) : (
          !message && <p className="text-white text-sm sm:text-base">No reviews yet.</p>
        )}
      </div>
    </div>
  )
}

export default BookReviews
