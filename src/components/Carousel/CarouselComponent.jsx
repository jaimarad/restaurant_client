import Carousel from 'react-bootstrap/Carousel';

function CarouselComp({ photos, name, address }) {
	return (
		<Carousel>
			{photos && photos.map((photo) => {
				return (
					<Carousel.Item>
						<img
							className="d-block w-100"
							src={photo.getUrl()}
							alt="First slide"
						/>
						<Carousel.Caption>
							<h3>{name}</h3>
							<p>{address}</p>
						</Carousel.Caption>
					</Carousel.Item>
				)
			})}

		</Carousel>
	);
}

export default CarouselComp;