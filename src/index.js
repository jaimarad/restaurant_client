import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { MessageProviderWrapper } from './contexts/userMessage.context';
import { BrowserRouter as Router } from 'react-router-dom';
import { MapProvider } from './contexts/map.context';
import { AuthProviderWrapper } from './contexts/auth.context';
import { RestaurantWrapper } from './contexts/restaurant.context';
import { ReviewWrapper } from './contexts/review.context';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<MessageProviderWrapper>
			<RestaurantWrapper>
				<ReviewWrapper>
					<Router>
						<MapProvider>
							<AuthProviderWrapper>
								<App />
							</AuthProviderWrapper>
						</MapProvider>
					</Router>
				</ReviewWrapper>
			</RestaurantWrapper>
		</MessageProviderWrapper>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
