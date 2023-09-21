/* eslint-disable react/prop-types */
import { useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Zoom from '@mui/material/Zoom';

function CreateArea(props) {
	const [note, setNote] = useState({ title: '', content: '' });

	function updateNote(event) {
		const input = event.target.value;
		const name = event.target.attributes.name.value;
		setNote(prev => {
			const newObj = { ...prev };
			if (name === 'title') {
				newObj.title = input;
				return newObj;
			}
			if (name === 'content') {
				newObj.content = input;
				return newObj;
			}
		});
	}
	const [focused, changeFocus] = useState(false);
	function expand() {
		changeFocus(true);
	}

	return (
		<div>
			<form
				className="create-note"
				onSubmit={e => {
					e.preventDefault();
				}}
			>
				{focused ? (
					<input
						name="title"
						placeholder="Title"
						value={note.title}
						onChange={updateNote}
					/>
				) : (
					<div></div>
				)}
				<textarea
					name="content"
					placeholder="Take a note..."
					rows={focused ? 3 : 1}
					value={note.content}
					onChange={updateNote}
					onClick={expand}
				/>
				<Zoom in={focused}>
					<Fab
						onClick={() => {
							props.onAdd(note);
							setNote({ title: '', content: '' });
						}}
					>
						<AddIcon />
					</Fab>
				</Zoom>
			</form>
		</div>
	);
}

export default CreateArea;
