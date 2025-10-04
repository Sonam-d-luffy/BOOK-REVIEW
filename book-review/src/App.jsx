import './App.css'
import { BrowserRouter, Routes,Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import AddBooks from './Pages/AddBooks'
import AddReview from './Pages/AddReview'
import ExploreBooks from './Pages/ExploreBooks'
import BookReviews from './Pages/BookReviews'
import UserReview from './Pages/UserReview'
import UserBooks from './Pages/UserBooks'
import { useEffect } from 'react'
import { refreshToken } from './api'

function App() {
  useEffect(() => {
    // Proactively refresh access token every 14 minutes
    const interval = setInterval(() => {
      refreshToken()
    }, 14 * 60 * 1000) // 14 minutes

    // Clean up on unmount
    return () => clearInterval(interval)
  }, [])
  return (
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/login' element={<Login/>} />
    <Route path='/reviewBooks' element={<ExploreBooks/>} />
    <Route path='/user/:userId/:bookId/addReview' element={<AddReview/>} />
    <Route path='/:id/addBooks' element={<AddBooks/>} />
    <Route path='/book/:bookId/reviews' element={<BookReviews/>} />
    <Route path='/:userId/yourReviews' element={<UserReview/>} />
    <Route path='/:userId/yourBooks' element={<UserBooks/>} />
  </Routes>
  </BrowserRouter>
  )
}

export default App
