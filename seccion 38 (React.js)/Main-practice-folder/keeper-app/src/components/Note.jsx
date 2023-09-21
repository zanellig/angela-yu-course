/* eslint-disable react/prop-types */
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

function Note(props) {
	const note = (
		<div className="note">
			<h1>{props.title}</h1>
			<p>{props.content}</p>
			<IconButton
				onClick={() => {
					props.onDelete(props.id);
				}}
			>
				<DeleteIcon />
			</IconButton>
		</div>
	);

	return note;
}

export default Note;
