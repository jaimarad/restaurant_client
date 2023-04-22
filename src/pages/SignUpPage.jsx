import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebaseService from "../services/firebase";
import userService from "../services/userAxios";

export default function SignUpPage() {
	const [fields, setFields] = useState({
		email: "",
		name: "",
		password: "",
		confirmPassword: ""
	});
	const [error, setError] = useState("");

	const navigate = useNavigate();

	const handleChange = (e) => {
		setFields({ ...fields, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (fields.password.length < 6) {
			return setError("Password must be at least 6 characters in length.");
		}
		if (fields.confirmPassword !== fields.password) {
			return setError("Password and confirm password must match.");
		}
		try {
			const { user } = await createUserWithEmailAndPassword(
				firebaseService.auth,
				fields.email,
				fields.password
			);
			if (user) {
				//setAuthorized();
				await userService.create({ email: user.email, uid: user.uid, name: fields.name })
				navigate("/");
				console.log("Called");
				console.log(user);
				console.log(user.uid);
			}
		} catch (err) {
			console.log(err);
			if (err.code == "auth/email-already-exists")
				setError("User account already exists at email address.")
			else
				setError("Invalid email address or password.");
		}
	};

	//const handleSubmit = async (e) => {
	//	e.preventDefault();
	//	if (fields.password.length < 6) {
	//		return setError("Password must be at least 6 characters in length.");
	//	}
	//	if (fields.confirmPassword !== fields.password) {
	//		return setError("Password and confirm password must match.");
	//	}

	//	try {
	//		const req = await axios.post("http://localhost:5005/api/user", {
	//			email: fields.email,
	//			password: fields.password,
	//			name: fields.name
	//		});
	//		const message = req.data.success;
	//		return navigate("/signin", {
	//			replace: true,
	//			state: {
	//				message
	//			}
	//		});
	//	} catch (err) {
	//		const errMessage = err.response.data.error;
	//		return setError(errMessage);
	//	}
	//};

	return (
		<div>
			<h1>Sign Up</h1>
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
					<label htmlFor="name">Name</label>
				</div>
				<div>
					<input
						type="text"
						name="name"
						value={fields.name}
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
				<div style={{ marginTop: "1rem" }}>
					<label htmlFor="confirmPassword">Confirm Password</label>
				</div>
				<div>
					<input
						type="password"
						name="confirmPassword"
						value={fields.confirmPassword}
						onChange={handleChange}
						required
					/>
				</div>

				{error ? <p style={{ color: "red" }}>Error: {error}</p> : null}
				<div style={{ marginTop: "1rem" }}>
					<button type="submit">Sign Up</button>
				</div>
			</form>
		</div>
	);
}
