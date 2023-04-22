import { useContext, useEffect, useState } from "react";
import restaurantAxios from "../services/restaurantAxios";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NewRestaurantForm from "../components/NewRestaurantForm/NewRestaurantForm";
import placesAxios from "../services/placesAxios";
import ReactGoogleAutocomplete from "react-google-autocomplete";
import RestaurantList from "../components/RestaurantList/RestaurantList";
import { RestaurantContext } from "../contexts/restaurant.context";
import { AuthContext } from "../contexts/auth.context";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import firebaseService from "../services/firebase";

const HomePage = () => {
	const { user, isLoading, logout } = useContext(AuthContext)
	const { restaurants, loadRestaurants } = useContext(RestaurantContext)
	const [showModal, setShowModal] = useState(false)
	const openModal = () => setShowModal(true)
	const closeModal = () => setShowModal(false)
	const navigate = useNavigate()

	const handlesignOut = async () => {
		try {
			await signOut(firebaseService.auth)
			console.log('signed out')
			navigate("/signin")
		} catch (err) {
			console.log(err)
		}
	}

	useEffect(() => {
		loadRestaurants()
	}, [])


	return (
		<div>
			{user && user.role == 'ADMIN' && <Button onClick={openModal}>Create Restaurant</Button>}
			<h1>Home Page</h1>

			<RestaurantList restaurants={restaurants} />

			<Modal show={showModal} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>Nuevo restaurante</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<NewRestaurantForm closeModal={closeModal} refreshList={loadRestaurants} />
				</Modal.Body>
			</Modal>
		</div >
	);
};

export default HomePage;