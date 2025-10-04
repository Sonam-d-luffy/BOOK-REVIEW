import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import InputField from '../Components/InputField'
import Navbar from '../Components/Navbar'
import assets from '../assets/assets'
import Button from '../Components/Button'
import api from '../api'

const AddBooks = () => {
    const { id } = useParams()
    const [message, setMessage] = useState('')
    const [data, setData] = useState({
        title: '', 
        author: '', 
        description: '', 
        genre: '', 
        publishedYear: ''
    })
    const navigate = useNavigate()

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await api.post(
                `api/books/${id}/addBook`, 
                data
            )
            setMessage(res?.data?.message)
            alert(res?.data?.message)
            setData({    
                title: '', 
                author: '', 
                description: '', 
                genre: '', 
                publishedYear: '' 
            })
            navigate('/')
        } catch (error) {
            setMessage(error?.response?.data?.message || "Server error")
        }
    }

    return (
        <div className="relative min-h-screen">
            {/* Slightly blurry background */}
            <div
                className="absolute inset-0 bg-cover bg-center filter blur-sm -z-10"
                style={{ backgroundImage: `url(${assets.b7})` }}
            ></div>

            {/* Overlay for slight dark tint */}
            <div className="absolute inset-0 bg-black/20 -z-10"></div>

            {/* Navbar scrolls with page (remove fixed) */}
            <div className="w-full z-20">
                <Navbar 
                    title={'Add Book'} 
                    logo={assets.logo} 
                    buttonName={'Home'} 
                    onButtonClick={() => navigate('/')} 
                />
            </div>

            {/* Form Container */}
            <div className="flex flex-col items-center justify-start pt-32 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-sm sm:max-w-md bg-white/30 backdrop-blur-md p-6 rounded-2xl shadow-lg">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <InputField 
                            label="Title" 
                            type="text" 
                            name="title" 
                            value={data.title} 
                            onChange={handleChange} 
                            vertical={true} 
                            noBorder={true} // remove left/right borders
                        />
                        <InputField 
                            label="Author" 
                            type="text" 
                            name="author" 
                            value={data.author} 
                            onChange={handleChange} 
                            vertical={true}
                            noBorder={true}
                        />
                        <InputField 
                            label="Description" 
                            type="text" 
                            name="description" 
                            value={data.description} 
                            onChange={handleChange} 
                            vertical={true}
                            noBorder={true}
                        />
                        <InputField 
                            label="Genre" 
                            type="text" 
                            name="genre" 
                            value={data.genre} 
                            onChange={handleChange} 
                            vertical={true}
                            noBorder={true}
                        />
                        <InputField 
                            label="Published Year" 
                            type="number" 
                            name="publishedYear" 
                            value={data.publishedYear} 
                            onChange={handleChange} 
                            vertical={true}
                            noBorder={true}
                        />
                         <div className="flex justify-center mt-4">
                        <Button 
                            type="submit" 
                            text={'Add Book'}
                        />
                    </div>
                    </form>

                    {message && <p className="mt-3 text-center text-red-600">{message}</p>}
                </div>
            </div>
        </div>
    )
}

export default AddBooks
