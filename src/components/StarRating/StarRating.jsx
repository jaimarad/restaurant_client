import { useState } from "react";
import "./StarRating.css"

const StarRating = ({ setFields, fields, hover, setHover }) => {
	const { rating } = fields
	return (
		<div className="star-rating">
			{[...Array(5)].map((star, index) => {
				index += 1;
				return (
					<button
						type="button"
						key={index}
						className={index <= (hover || rating) ? "on" : "off"}
						onClick={() => setFields({ ...fields, ['rating']: index })}
						onMouseEnter={() => setHover(index)}
						onMouseLeave={() => setHover(rating)}
					>
						<span className="star">&#9733;</span>
					</button>
				);
			})}
		</div>
	);
};

export default StarRating