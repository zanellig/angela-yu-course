// import { useState } from 'react';

import './App.css';

function App() {
	const year = new Date().getFullYear();

	return (
		<>
			<div className="container main-container">
				<div className="container">
					<p className="heading">Created by Gonzalo Zanelli</p>
					<p>Copyright {year} &copy;</p>
				</div>

				<div className="container">
					<img
						src="https://images.pexels.com/photos/844127/pexels-photo-844127.jpeg"
						alt="bitcoin image"
					/>
					<img
						src="https://images.pexels.com/photos/730552/pexels-photo-730552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
						alt="ethereum image"
					/>
					<img
						src="https://zipmex.com/static/86ade2afeeb1bb7e62fd024c63fef4a5/1bbe7/Maker-MKR-Explained.jpg"
						alt="maker image"
					/>
				</div>
			</div>
		</>
	);
}

export default App;
