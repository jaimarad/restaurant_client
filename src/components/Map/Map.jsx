import { GoogleMap, Marker, MarkerF } from "@react-google-maps/api"

const Map = ({ center, setMap }) => {
	return (
		<>
			{/* Google Map div */}
			<GoogleMap
				center={center}
				zoom={17}
				mapContainerStyle={{ width: '300px', height: '300px' }}
				options={{
					zoomControl: false,
					streetViewControl: false,
					mapTypeControl: false,
					fullscreenControl: false,
				}}
				onLoad={map => setMap(map)}
			>
				{/*icon={{ url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" }}*/}
				<MarkerF position={center} />
			</GoogleMap>
		</>
	)

}

export default Map