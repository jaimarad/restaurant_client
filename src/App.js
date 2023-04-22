import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AppRoutes from './routes/AppRoutes';
import UserMessage from './components/UserMessage/UserMessage';
import './App.css'
import Navigation from './components/Navigation/Navigation';

const App = () => {
	return (
		<div className="App pb-5">
			<Navigation />
			<AppRoutes />
			{/*<Footer />*/}
			<UserMessage />
		</div>
	);
};
export default App;
