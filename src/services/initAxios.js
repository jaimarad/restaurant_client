import axios from 'axios';
import firebaseService from './firebase';

const getUserToken = async () => {
	return new Promise((resolve, reject) => {
		firebaseService.auth.onAuthStateChanged(async (user) => {
			if (user) {
				const token = await firebaseService.auth.currentUser.getIdToken(user);
				resolve(token)
			} else {
				console.log("User not logged in")
				resolve(null)
			}
		});
	})
}

class InitAxios {
	constructor(path) {
		this.axios = axios.create({
			baseURL: `${process.env.REACT_APP_BASE_URL}${path}`
		})

		this.axios.interceptors.request.use(async (config) => {
			const token = await getUserToken();
			if (token) {
				config.headers = {
					'authorization': `Bearer ${token}`
				}
			}
			return config
		})
	}
}

export default InitAxios;
