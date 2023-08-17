import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Heading from './Heading';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<App />
		<Heading />
	</React.StrictMode>
);
