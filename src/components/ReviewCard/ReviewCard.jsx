import { Card } from "react-bootstrap"

const ReviewCard = ({ text, rating, owner }) => {
	return (
		<Card>
			<Card.Title>{owner.name} {rating}<span className="star">&#9733;</span></Card.Title>
			<Card.Body>{text}</Card.Body>
		</Card>
	)
}

export default ReviewCard