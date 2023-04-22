import { useContext, useEffect, useState } from "react";
import firebaseService from "../services/firebase";
import axios from "axios";
import { AuthContext } from "../contexts/auth.context";

export default function DashboardPage() {
	//const [loadingUser, setLoadingUser] = useState(true);
	//const [user, setUser] = useState(null);
	const { user, isLoading, authenticateUser } = useContext(AuthContext)

	//const getUser = async () => {
	//	try {
	//		console.log("FIREBASE------------->", firebaseService.auth.currentUser)
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
	//			setLoadingUser(false);
	//		}
	//	} catch (err) {
	//		console.error(err);
	//	}
	//};

	useEffect(() => {
		authenticateUser()
	}, []);


	return (
		<>
			<h1>Dashboard</h1>
			{isLoading ? (
				<p>Loading User</p>
			) : (
				<div>
					<p>Name: {user.name}</p>
					<p>FirebaseID: {user.firebaseId}</p>
					<p>Email: {user.email}</p>
					{user.togo.map(() => {

					})}
				</div>
			)}
		</>
	);
}
