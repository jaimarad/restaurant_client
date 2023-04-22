import InitAxios from "./initAxios";

class RestaurantAxios extends InitAxios {
	constructor() {
		super('/restaurants')
	}

	newRestaurant(body) {
		return this.axios.post('/new', body).then((response) => response.data)
	}

	getAllRestaurants() {
		return this.axios.get('/').then((response) => response.data)
	}

	getOneRestaurant(restaurantId) {
		return this.axios.get(`/${restaurantId}`).then((response) => response.data)
	}

	updateRestaurant(restaurantId, body) {
		return this.axios.put(`/${restaurantId}`, body).then((response) => response.data)
	}

	deleteRestaurant(restaurantId) {
		return this.axios.delete(`/${restaurantId}`).then((response) => response.data)
	}

	handleToGo(action, restaurantId) {
		return this.axios.put(`/togo/${restaurantId}`, action).then((response) => response.data)
	}

	handleFav(action, restaurantId) {
		return this.axios.put(`/fav/${restaurantId}`, action).then((response) => response.data)
	}


	static getInstance() {
		if (!this.instance) {
			this.instance = new RestaurantAxios();
		}
		return this.instance;
	}

}

export default RestaurantAxios.getInstance()