/* eslint-disable react/prop-types */
function Note(props) {
	const note = (
		<div className="note">
			<h1>{props.title}</h1>
			<p>{props.content}</p>
			<button
				onClick={() => {
					props.onDelete(props.id);
				}}
			>
				DELETE
			</button>
		</div>
	);

	return note;
}

export default Note;
