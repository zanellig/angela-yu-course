import './App.css';

function App() {
	const date = new Date();
	const currentTime = date.getHours();

	let string;
	const customH1Style = {
		color: null,
	};

	if (currentTime < 12) {
		customH1Style.color = 'red';
		string = 'morning';
	} else if (currentTime < 18) {
		customH1Style.color = 'green';
		string = 'afternoon';
	} else {
		customH1Style.color = 'blue';
		string = 'night';
	}

	return (
		<>
			<div>
				<h1 style={customH1Style}>Good {string}</h1>
			</div>
		</>
	);
}

export default App;
