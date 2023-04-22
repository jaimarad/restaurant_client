const { default: InitAxios } = require("./initAxios");

class UserAxios extends InitAxios {
	constructor() {
		super('/user')
	}

	create(body) {
		return this.axios.post('/create', body)
	}

	static getInstance() {
		if (!this.instance) {
			this.instance = new UserAxios();
		}
		return this.instance;
	}
}

export default UserAxios.getInstance()