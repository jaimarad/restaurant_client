import { Col, Row } from "react-bootstrap"
import RestaurantCard from "../RestaurantCard/RestaurantCard"

const RestaurantList = ({ restaurants }) => {
	{
		return (
			<Row>
				{restaurants && restaurants.map((restaurant) => {
					return (
						<Col sm={{ span: 4 }} key={restaurant._id} >
							<RestaurantCard {...restaurant} />
						</Col>

					)
				})}
			</Row >)
	}
}

export default RestaurantList