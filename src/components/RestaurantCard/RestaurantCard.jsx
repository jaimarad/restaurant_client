import { Button, ButtonGroup, Spinner } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import './RestaurantCard.css'
import { useContext } from 'react';
import { RestaurantContext } from '../../contexts/restaurant.context';
import { AuthContext } from '../../contexts/auth.context';

function RestaurantCard({ name, imageUrl, _id, address }) {
	const { deleteRestaurant } = useContext(RestaurantContext)
	const { user, isLoading } = useContext(AuthContext)

	if (isLoading)
		return <Spinner></Spinner>
	return (
		<Card className="mb-4 CoasterCard">
			<Card.Img variant="top" src={imageUrl} />
			<Card.Body>
				<Card.Title>{name}</Card.Title>
				<Card.Subtitle className="mb-2 text-muted">{address}</Card.Subtitle>
				{
					<>
						<Link to={`/details/${_id}`}>
							<div className="d-grid">
								<Button variant="dark" size="sm">Ver detalles</Button>
							</div>
						</Link>
						{user && user.role == 'ADMIN' && <Button onClick={() => deleteRestaurant(_id)}>Delete</Button>}
					</>
				}


			</Card.Body>
		</Card>
	);
}

export default RestaurantCard;