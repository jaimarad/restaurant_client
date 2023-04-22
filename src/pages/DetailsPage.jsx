import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import placesAxios from "../services/placesAxios"
import { Button, Spinner } from "react-bootstrap"
import { AuthContext } from "../contexts/auth.context"
import restaurantAxios from "../services/restaurantAxios"
import ListReviews from "../components/ListReviews/ListReviews"
import ReviewForm from "../components/ReviewForm/ReviewForm"
import CarouselComp from "../components/Carousel/CarouselComponent"
import Map from "../components/Map/Map"
import { MapsContext } from "../contexts/map.context"

const DetailsPage = () => {
	const { restaurant_id } = useParams()
	const [restaurant, setRestaurant] = useState(null)
	const { user, authenticateUser } = useContext(AuthContext)
	const { setMap, isLoaded } = useContext(MapsContext)
	//const googleMap = new window.google.maps.Map(document.getElementById('map'), { center: { lat: -33.867, lng: 151.206 }, zoom: 15 });

	const findById = async (id) => {
		try {
			const restaurant = await placesAxios.detailsById(id)
			setRestaurant(restaurant)
		} catch (err) {
			console.log(err)
		}
	}

	const handletogoRestaurant = (action) => {
		restaurantAxios.handleToGo({ action }, restaurant_id)
			.then(() => authenticateUser())
			.catch(console.log)
	}
	const handletofavRestaurant = (action) => {
		restaurantAxios.handleFav({ action }, restaurant_id)
			.then(() => authenticateUser())
			.catch(console.log)
	}

	useEffect(() => {
		findById(restaurant_id)
	}, [])

	console.log(restaurant)

	if (!restaurant || !isLoaded)
		return <Spinner />

	return (
		<>
			{/*<CarouselComp photos={restaurant.photos} name={restaurant.name} address={restaurant.address} />*/}
			<h1>{restaurant.name}</h1>
			<h2>{restaurant.address}</h2>
			<a href={restaurant.website} target="_blank">Link</a>
			<p>{restaurant.number}</p>
			<p>{restaurant.price_level}</p>

			<p>Schedule</p>
			{restaurant.schedule.map((day, idx) => {
				return (
					<p key={idx}>{day}</p>
				)
			})}
			{user.toGo.includes(restaurant_id)
				? <Button onClick={() => handletogoRestaurant("remove")}>Remove To Go</Button>
				: <Button onClick={() => handletogoRestaurant("add")}>Add To Go</Button>
			}
			{user.favs.includes(restaurant_id)
				? <Button onClick={() => handletofavRestaurant("remove")}>Remove Fav</Button>
				: <Button onClick={() => handletofavRestaurant("add")}>Add Fav</Button>
			}
			<ListReviews restaurant_id={restaurant_id} />
			<ReviewForm restaurant_id={restaurant_id} />
			<Map center={restaurant.coordinates} setMap={setMap} />
		</>
	)
}

export default DetailsPage