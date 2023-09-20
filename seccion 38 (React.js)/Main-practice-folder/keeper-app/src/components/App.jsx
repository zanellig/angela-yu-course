/* eslint-disable react/prop-types */
import Footer from './Footer';
import Header from './Header';
import Note from './Note';
import notes from './notes.js';

import CreateArea from './CreateArea';

function App() {
	function addNote(input) {
		input.key = notes.length + 1;
		notes.push(input);
		console.log(notes);
	}

	return (
		<>
			<Header />
			<CreateArea onAdd={addNote} />
			{notes.map(element => {
				return (
					<Note
						key={element.id}
						title={element.title}
						content={element.content}
					/>
				);
			})}
			<Footer />
		</>
	);
}

export default App;
