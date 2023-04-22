import { createContext, useEffect, useState } from "react"
import authService from "../services/authAxios"
import firebaseService from "../services/firebase"
import axios from "axios"
import { signOut } from "firebase/auth"


const AuthContext = createContext()

function AuthProviderWrapper(props) {

	const [user, setUser] = useState(null)
	const [isLoading, setIsLoading] = useState(true)

	//const authenticateUser = () => {

	//	const token = localStorage.getItem('authToken')

	//	if (token) {
	//		authService
	//			.verify(token)
	//			.then(({ data }) => setUser(data))
	//			.catch(err => logout())
	//	}
	//}

	//const authenticateUser = async () => {
	//	try {
	//		setIsLoading(true)
	//		const token = await firebaseService.auth.currentUser.getIdToken(true);
	//		console.log(token);
	//		const req = await axios.get("http://localhost:5005/api/user", {
	//			headers: {
	//				authorization: `Bearer ${token}`
	//			}
	//		});
	//		console.log(req.data);
	//		if (req.data) {
	//			setUser(req.data);
	//			setIsLoading(false);
	//		}
	//	} catch (err) {
	//		setIsLoading(false);
	//		console.error("ERROR------------->", err);
	//	}
	//};

	const authenticateUser = () => {
		try {
			setIsLoading(true)
			firebaseService.auth.onAuthStateChanged(async user => {
				if (user) {
					const token = await firebaseService.auth.currentUser.getIdToken(true);
					console.log(token);
					const req = await axios.get("http://localhost:5005/api/user", {
						headers: {
							authorization: `Bearer ${token}`
						}
					});
					console.log(req.data);
					if (req.data) {
						setUser(req.data);
						setIsLoading(false);
					}
				}
				else {
					setUser(null);
					setIsLoading(false);
				}
			})
		} catch (err) {
			setIsLoading(false);
			console.error("ERROR------------->", err);
		}
	}

	const logout = async () => {
		try {
			await signOut(firebaseService.auth)
			console.log('signed out')
			setUser(null)
		} catch (err) {
			console.log(err)
		}
	}


	useEffect(() => {
		authenticateUser()
	}, [])

	return (
		<AuthContext.Provider value={{ authenticateUser, user, logout, isLoading }}>
			{props.children}
		</AuthContext.Provider>
	)
}

export { AuthContext, AuthProviderWrapper }