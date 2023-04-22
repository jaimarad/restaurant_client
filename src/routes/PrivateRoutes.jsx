import { useContext } from "react"
import { Outlet, Navigate } from "react-router-dom"
import { AuthContext } from "../contexts/auth.context"
import { Spinner } from "react-bootstrap"

const PrivateRoute = () => {

	const { user, isLoading } = useContext(AuthContext)

	if (isLoading) {
		return <Spinner></Spinner>
	}

	if (!user) {
		console.log("No puedes pasar")
		return <Navigate to="/signin" />
	}

	return <Outlet />
}

export default PrivateRoute