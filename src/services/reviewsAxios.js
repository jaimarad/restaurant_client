import InitAxios from "./initAxios";

class ReviewsAxios extends InitAxios {
	constructor() {
		super('/reviews')
	}

	getReviews(id) {
		return this.axios.get(`/${id}`).then(res => res.data)
	}

	createReview(body, id) {
		return this.axios.post(`/${id}`, body).then(res => res.data)
	}

	deleteReview(id) {
		return this.axios.delete(`/${id}`).then(res => res.data)
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new ReviewsAxios();
		}
		return this.instance;
	}

}

export default ReviewsAxios.getInstance()