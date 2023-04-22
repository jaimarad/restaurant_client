import axios from 'axios'
import InitAxios from './initAxios';

class AuthService extends InitAxios {
	constructor() {
		super('/auth')
	}

	signup(userData) {
		return this.axios.post('/signup', userData)
	}

	login(userData) {
		return this.axios.post('/login', userData)
	}

	verify = token => {
		return this.axios.get('/verify', { headers: { Authorization: `Bearer ${token}` } })
	}
}

const authService = new AuthService()

export default authService