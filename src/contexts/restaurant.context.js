import { createContext, useEffect, useState } from 'react'
import authService from '../services/authAxios'
import restaurantAxios from '../services/restaurantAxios'

const RestaurantContext = createContext()

function RestaurantWrapper(props) {
	const [restaurants, setRestaurants] = useState(null)

	const loadRestaurants = () => {
		restaurantAxios.getAllRestaurants()
			.then((response) => {
				setRestaurants(response)
			})
			.catch((err) => {
				console.log(err)
			})
	}

	const deleteRestaurant = (id) => {
		restaurantAxios.deleteRestaurant(id)
			.then(() => loadRestaurants())
			.catch((err) => console.log(err))
	}
	return (
		<RestaurantContext.Provider value={{ loadRestaurants, restaurants, deleteRestaurant }}>
			{props.children}
		</RestaurantContext.Provider>
	)
}

export { RestaurantContext, RestaurantWrapper }