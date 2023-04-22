import InitAxios from "./initAxios";

class PlaceAxios extends InitAxios {
	constructor() {
		super('/places')
	}

	detailsById(place_id) {
		return this.axios.get(`/detail/${place_id}`).then(res => res.data)
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new PlaceAxios();
		}
		return this.instance;
	}

}

export default PlaceAxios.getInstance()