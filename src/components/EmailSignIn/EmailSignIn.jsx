//import { useStoreActions } from "easy-peasy";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { resolvePath, useLocation, useNavigate } from "react-router-dom";
import firebaseService from "../../services/firebase";
import { Button } from "react-bootstrap"

export default function EmailSignIn() {
	const location = useLocation();
	const navigate = useNavigate();
	const [fields, setFields] = useState({
		email: "",
		password: ""
	});
	const [error, setError] = useState("");

	//const setAuthorized = useStoreActions((actions) => actions.setAuthorized);

	const handleChange = (e) => {
		setFields({ ...fields, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await signInWithEmailAndPassword(
				firebaseService.auth,
				fields.email,
				fields.password
			);
			if (res) {
				//setAuthorized();
				navigate("/");
				console.log("Called");
				console.log(res.user.email)
				console.log(res.user.uid);
			}
		} catch (err) {
			console.log(err);
			setError("Invalid email address or password.");
		}
	};

	return (
		<main>
			{location.state && location.state.message ? (
				<p style={{ color: "green" }}>{location.state.message}</p>
			) : null}
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor="email">Email Address</label>
				</div>
				<div>
					<input
						type="email"
						name="email"
						value={fields.email}
						onChange={handleChange}
						required
					/>
				</div>
				<div style={{ marginTop: "1rem" }}>
					<label htmlFor="password">Password</label>
				</div>
				<div>
					<input
						type="password"
						name="password"
						value={fields.password}
						onChange={handleChange}
						required
					/>
				</div>
				{error ? <p style={{ color: "red" }}>Error: {error}</p> : null}
				<div style={{ marginTop: "1rem" }}>
					<button type="submit">Sign In</button>
				</div>
			</form>
		</main>
	);
}
