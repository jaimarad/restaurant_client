import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage"
import DetailsPage from "../pages/DetailsPage"
import LogInPage from "../pages/LogInPage"
import PrivateRoute from "./PrivateRoutes"
import SignUpPage from "../pages/SignUpPage"
import DashboardPage from "../pages/Dashboard"
//import SignInPageFire from "../pages/SignIn"


const AppRoutes = () => {

	return (
		<Routes>
			<Route path="/" element={<HomePage />} />
			<Route element={<PrivateRoute />} >
				<Route path="/details/:restaurant_id" element={<DetailsPage />} />
			</Route >
			<Route path="/signup" element={<SignUpPage />} />
			<Route path="/signin" element={<LogInPage />} />
			<Route path="/dashboard" element={<DashboardPage />} />

			{/*<Route path="/galeria" element={<CoastersListPage />} />
			<Route path="/perfil" element={<p>perfil</p>} />*/}
			{/*<Route path="signupfire" element={<SignUpPageFire />} />*/}
			{/*<Route path="signinfire" element={<SignInPageFire />} />*/}
			<Route path="/*" element={<h1>404</h1>} />
		</Routes>
	)
}

export default AppRoutes