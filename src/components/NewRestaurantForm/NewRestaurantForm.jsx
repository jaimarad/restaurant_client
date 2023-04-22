import React, { useState, useContext } from "react"
import { Form, Button, Row, Col, Spinner } from "react-bootstrap"
import { MessageContext } from '../../contexts/userMessage.context'
import restaurantAxios from "../../services/restaurantAxios"
import ReactGoogleAutocomplete from "react-google-autocomplete"
import "./NewRestaurantForm.css"
import Map from "../Map/Map"
import { MapsContext } from "../../contexts/map.context"


const NewRestaurantForm = ({ closeModal, refreshList }) => {
	const { isLoaded, setMap } = useContext(MapsContext)

	const [restaurantData, setRestaurantData] = useState({
		name: '',
		address: '',
		lat: 0,
		lng: 0,
		imageUrl: '',
		place_id: ''
	})

	const [center, setCenter] = useState({
		lat: 40.4165, lng: -3.7026
	})

	const handleInputChange = e => {
		const { name, value } = e.target
		setRestaurantData({ ...restaurantData, [name]: value })
	}

	const { setShowToast, setToastMessage } = useContext(MessageContext)

	const handleFormSubmit = e => {
		console.log(restaurantData)
		e.preventDefault()

		restaurantAxios
			.newRestaurant(restaurantData)
			.then(() => {
				setShowToast(true)
				setToastMessage('Restaurante añadido')
				refreshList()
				closeModal()
			})
			.catch(err => {
				console.error(err)
				setShowToast(true)
				setToastMessage(err.response.data.message)
			})
	}

	const handleSelect = (place) => {
		console.log(place)
		let lat = place.geometry.location.lat()
		let lng = place.geometry.location.lng()
		setRestaurantData({
			name: place.name,
			address: place.formatted_address,
			lat,
			lng,
			imageUrl: place.photos[0].getUrl({ maxWidth: '400' }),
			place_id: place.place_id
		})
		setCenter({ lat, lng })
	}

	const { name, address, lat, lng } = restaurantData

	if (!isLoaded) {
		return <Spinner animation="border" />
	}

	return (
		<>
			<h2>Usar autocompletado de Google</h2>
			<ReactGoogleAutocomplete
				apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
				onPlaceSelected={(place) => handleSelect(place)}
				options={{
					types: ['restaurant'],
					//componentRestrictions: { country: "es" },
					fields: ["name", "formatted_address", "geometry", "photos", "place_id"]
				}}
				className="autocomplete"
			/>
			<Form onSubmit={handleFormSubmit}>

				<Form.Group className="mb-3" controlId="name">
					<Form.Label>Nombre</Form.Label>
					<Form.Control type="text" value={name} onChange={handleInputChange} name="name" />
				</Form.Group>

				<Form.Group className="mb-3" controlId="desc">
					<Form.Label>Direccion</Form.Label>
					<Form.Control type="text" value={address} onChange={handleInputChange} name="direction" />
				</Form.Group>

				<Row>
					<Col>

						<Form.Group className="mb-3" controlId="inv">
							<Form.Label>latitud</Form.Label>
							<Form.Control type="number" value={lat} onChange={handleInputChange} name="lat" />
						</Form.Group>
					</Col>
					<Col>
						<Form.Group className="mb-3" controlId="len">
							<Form.Label>longitud</Form.Label>
							<Form.Control type="number" value={lng} onChange={handleInputChange} name="lng" />
						</Form.Group>
					</Col>
				</Row>

				<Map center={center} setMap={setMap} />

				<div className="d-grid">
					<Button variant="dark" type="submit">Crear restaurante</Button>
				</div>
			</Form>
		</>
	)
}

export default NewRestaurantForm