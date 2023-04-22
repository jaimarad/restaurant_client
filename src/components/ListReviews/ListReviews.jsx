import { useContext, useEffect, useState } from "react"
import { ReviewsContext } from "../../contexts/review.context"
import ReviewCard from "../ReviewCard/ReviewCard"

const ListReviews = ({ restaurant_id }) => {
	const { reviews, loadReviews } = useContext(ReviewsContext)

	useEffect(() => {
		loadReviews(restaurant_id)
	}, [])

	return (
		reviews && (reviews.length == 0
			? <p>No reviews yet</p>
			: reviews.map((review) => {
				return <ReviewCard  {...review} key={review._id} />
			}))
	)
}

export default ListReviews