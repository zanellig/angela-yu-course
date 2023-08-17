function Heading() {
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
	return <h1 style={customH1Style}>Good {string}</h1>;
}

export default Heading;
