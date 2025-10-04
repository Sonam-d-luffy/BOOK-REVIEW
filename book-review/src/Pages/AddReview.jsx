import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import assets from '../assets/assets'
import InputField from '../Components/InputField'
import Button from '../Components/Button'
import api from '../api'

const AddReview = () => {
  const { userId, bookId } = useParams()
  const [message, setMessage] = useState('')
  const navigate = useNavigate()
  const [data, setData] = useState({
    rating: '',
    reviewText: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setData({
      ...data,
      [name]: name === "rating" ? Number(value) : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post(
        `api/review/user/${userId}/${bookId}/addReview`,
        data
      )
      alert(res.data.message)
      setMessage(res.data.message)
      setData({ rating: '', reviewText: '' })
      navigate(-1)
    } catch (error) {
      setMessage(error?.response?.data?.message || "Server Error")
    }
  }
 

 return (
  <div className="relative min-h-screen">
    {/* Blurry background */}
    <div
      className="absolute inset-0 bg-cover bg-center filter blur-sm -z-10"
      style={{ backgroundImage: `url(${assets.b5})` }}
    ></div>

    {/* Dark overlay */}
    <div className="absolute inset-0 bg-black/20 -z-10"></div>

    {/* Navbar */}
    <div className="w-full z-20">
      <Navbar
        title={'Add Review'}
        logo={assets.logo}
        buttonName={'Back'}
        onButtonClick={() => navigate(-1)}
      />
    </div>

    {/* Form container */}
    <div className="flex flex-col items-center justify-start pt-48 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm sm:max-w-md bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-3">
          <InputField
            label="Rating"
            type="number"
            name="rating"
            value={data.rating}
            onChange={handleChange}
            placeholder="Enter rating (0-5)"
            vertical={true}
            noBorder={true}
          />
          <InputField
            label="Review"
            type="text"
            name="reviewText"
            value={data.reviewText}
            onChange={handleChange}
            placeholder="Write your review here"
            vertical={true}
            noBorder={true}
          />

          <div className="flex justify-center mt-4">
            <Button
              type="submit" text={'Submit'}
            >
            </Button>
          </div>
        </form>

        {message && (
          <p className="mt-3 text-center text-red-600">{message}</p>
        )}
      </div>
    </div>
  </div>
)

}

export default AddReview
