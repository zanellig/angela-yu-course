/* eslint-disable react/prop-types */
import { useState } from 'react';

import Footer from './Footer';
import Header from './Header';
import Note from './Note';

import CreateArea from './CreateArea';

function App() {
	const [notes, setNotes] = useState([]);

	function addNote(input) {
		if (input.title && input.content) {
			input.key = `note-${notes.length}`;
			input.id = input.key;
			const newArr = [...notes];
			newArr.push(input);
			setNotes(newArr);
			console.log(notes);
		}
	}

	function handleDelete(noteId) {
		if (notes) {
			const newArr = notes.filter(note => note.id !== noteId);
			setNotes(newArr);
		}
	}

	return (
		<>
			<Header />
			<CreateArea onAdd={addNote} />
			{notes.map(note => {
				return (
					<Note
						title={note.title}
						content={note.content}
						key={note.key}
						id={note.id}
						onDelete={handleDelete}
					/>
				);
			})}
			<Footer />
		</>
	);
}

export default App;
