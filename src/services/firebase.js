import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: "AIzaSyBoTw2Rg91uNUb_zwmBsBUO8IzlMNvrD8I",
	authDomain: "restaurantes-31842.firebaseapp.com",
	projectId: "restaurantes-31842",
	storageBucket: "restaurantes-31842.appspot.com",
	messagingSenderId: "579996137507",
	appId: "1:579996137507:web:9039a756c5cc3590db9996"
};

initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider()

const auth = getAuth();

export default {
	auth,
	provider
};
