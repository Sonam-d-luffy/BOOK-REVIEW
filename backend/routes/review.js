import express from 'express'
import Review from '../models/reviewModel.js'

const router = express.Router()

router.post('/user/:userId/:bookId/addReview' , async(req , res) => {
    try {
        const {reviewText , rating} = req.body
        if(!reviewText ||rating === undefined) return res.status(400).json({message: 'All fields are required'})
        const {userId , bookId} = req.params
        const exists =await Review.findOne({userId , bookId})
        if(exists) return res.status(400).json({message: 'review already added'})
            const review = new Review({
        rating: Number(rating),reviewText,userId:userId , bookId: bookId
        })
        await review.save()
        return res.status(200).json({message: 'Review added successfully' , review:review})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: 'Server Error'})
    }
}) 
router.get('/book/:bookId/reviews' , async(req , res) => {
   try {
      const { bookId } = req.params
    const reviews = await Review.find({ bookId })

    if (!reviews || reviews.length === 0)
      return res.status(404).json({ message: 'No reviews found for this book', overallRating: 0 })

    // Calculate average rating
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0)
    const overallRating = totalRating / reviews.length

    return res.status(200).json({ message: 'Reviews fetched', overallRating, reviews: reviews })
   } catch (error) {
          console.log(error)
        return res.status(500).json({message: 'Server Error'})
   }
})

router.get('/:userId/yourReviews' , async(req , res) => {
   try {
      const { userId } = req.params
    const reviews = await Review.find({ userId })

    if (!reviews || reviews.length === 0)
      return res.status(404).json({ message: 'You have no reviews'})

    return res.status(200).json({ message: 'Reviews fetched', reviews: reviews })
   } catch (error) {
          console.log(error)
        return res.status(500).json({message: 'Server Error'})
   }
})

// Update 
router.put('/:userId/:bookId/edit', async (req, res) => {
  try {
    const { userId, bookId } = req.params
    const { reviewText, rating } = req.body
    if (!reviewText || rating === undefined)
      return res.status(400).json({ message: 'All fields are required' })

    const review = await Review.findOne({ userId, bookId })
    if (!review) return res.status(404).json({ message: 'Review not found' })

    review.reviewText = reviewText
    review.rating = Number(rating)
    await review.save()

    return res.status(200).json({ message: 'Review updated successfully', review })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server Error' })
  }
})
// delete
router.delete('/:userId/:bookId/delete', async (req, res) => {
  try {
    const { userId, bookId } = req.params
    const review = await Review.findOneAndDelete({ userId, bookId })

    if (!review) return res.status(404).json({ message: 'Review not found' })

    return res.status(200).json({ message: 'Review deleted successfully' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Server Error' })
  }
})

export default router