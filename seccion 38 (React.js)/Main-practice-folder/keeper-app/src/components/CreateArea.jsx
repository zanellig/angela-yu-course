/* eslint-disable react/prop-types */
import { useState } from 'react';

function CreateArea(props) {
	const [note, setNote] = useState({ title: '', content: '' });

	function updateNote(event) {
		const input = event.target.value;
		setNote(prev => {
			const newObj = { ...prev };
			if (event.target.attributes.name.value === 'title') {
				newObj.title = input;
				return newObj;
			}
			if (event.target.attributes.name.value === 'content') {
				newObj.content = input;
				return newObj;
			}
		});
	}

	return (
		<div>
			<form
				onSubmit={e => {
					e.preventDefault();
				}}
			>
				<input
					name="title"
					placeholder="Title"
					value={note.title}
					onChange={updateNote}
				/>
				<textarea
					name="content"
					placeholder="Take a note..."
					rows="3"
					value={note.content}
					onChange={updateNote}
				/>
				<button
					onClick={() => {
						props.onAdd(note);
						setNote({ title: '', content: '' });
					}}
				>
					Add
				</button>
			</form>
		</div>
	);
}

export default CreateArea;
