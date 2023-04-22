import { useContext, useState } from "react"
import { Button, Form } from "react-bootstrap"
import StarRating from "../StarRating/StarRating"
import reviewsAxios from "../../services/reviewsAxios"
import { ReviewsContext } from "../../contexts/review.context"

const ReviewForm = ({ restaurant_id }) => {
	const { createReview, loadReviews } = useContext(ReviewsContext)
	const [fields, setFields] = useState({
		text: '',
		rating: 0
	})
	const [hover, setHover] = useState(0);


	const handleOnChange = (e) => {
		console.log("actvaou")
		e.preventDefault()
		setFields({ ...fields, ['text']: e.target.value })
	}

	const handleSubmit = async (e) => {
		try {
			e.preventDefault()
			console.log(fields, restaurant_id)
			await createReview(fields, restaurant_id)
			await loadReviews(restaurant_id)
			setFields({
				text: ' ',
				rating: 0
			})
			setHover(0)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className="mb-3" controlId="formBasicEmail">
				<Form.Label>Review</Form.Label>
				<Form.Control type="text" placeholder="Write your review about this place..." onChange={(e) => handleOnChange(e)} value={fields.text} />
			</Form.Group>
			<Form.Group className="mb-3" controlId="formBasicPassword">
				<Form.Label>Rating</Form.Label>
				<StarRating fields={fields} setFields={setFields} hover={hover} setHover={setHover} />
			</Form.Group>
			<Button variant="primary" type="submit" >
				Create Review
			</Button>
		</Form>

	)
}

export default ReviewForm