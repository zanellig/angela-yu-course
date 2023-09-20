function Heading() {
	const customStyle = {
		color: '',
	};

	const randomNumber = Math.floor(Math.random() * 3 + 1);

	switch (randomNumber) {
		case 1:
			customStyle.color = 'red';
			break;
		case 2:
			customStyle.color = 'green';
			break;
		case 3:
			customStyle.color = 'blue';
			break;
	}

	return <h1 style={customStyle}>Hello World</h1>;
}

export default Heading;
