function Note(id, title, content) {
	(this.id = id), (this.title = title), (this.content = content);
}

const notes = [
	new Note(1, 'Title', 'Content'),
	new Note(2, 'Title 2', 'Content 2'),
];

export default notes;
