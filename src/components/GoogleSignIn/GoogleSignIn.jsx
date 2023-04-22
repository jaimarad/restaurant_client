import { Button } from "react-bootstrap";
import firebaseService from "../../services/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userAxios";
import { useContext } from "react";
import { AuthContext } from "../../contexts/auth.context";
import GoogleButton from "react-google-button"

const GoogleSignIn = () => {
	const navigate = useNavigate()
	const { authenticateUser } = useContext(AuthContext)
	const handleOnClick = async (e) => {
		e.preventDefault();
		try {
			const { user } = await signInWithPopup(
				firebaseService.auth,
				firebaseService.provider
			);
			if (user) {
				//setAuthorized();
				await userService.create({ email: user.email, uid: user.uid, name: user.displayName })
				authenticateUser()
				navigate("/");
				console.log("Called");
				console.log(user);
				console.log(user.uid);
			}
		} catch (err) {
			console.log(err);
			//setError("Invalid email address or password.");
		}
	};
	return (
		//<GoogleButton onClick={handleOnClick}>Log In with Google</Button>
		<GoogleButton onClick={handleOnClick} />
	)
}

export default GoogleSignIn