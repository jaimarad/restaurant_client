import { createContext, useEffect, useState } from 'react'
import authService from '../services/authAxios'
import restaurantAxios from '../services/restaurantAxios'
import reviewsAxios from '../services/reviewsAxios'

const ReviewsContext = createContext()

function ReviewWrapper(props) {
	const [reviews, setReviews] = useState(null)

	const loadReviews = async (restaurant_id) => {
		const allReviews = await reviewsAxios.getReviews(restaurant_id)
		setReviews(allReviews.reviews)
	}

	const createReview = async (fields, restaurant_id) => {
		try {
			await reviewsAxios.createReview(fields, restaurant_id)
		} catch (err) {
			console.log(err)
		}
	}

	const deleteReview = async (review_id) => {
		try {
			await reviewsAxios.deleteReview(review_id)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<ReviewsContext.Provider value={{ loadReviews, reviews, createReview, deleteReview }}>
			{props.children}
		</ReviewsContext.Provider>
	)
}

export {
	ReviewsContext, ReviewWrapper
}