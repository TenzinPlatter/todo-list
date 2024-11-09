class Project {
	constructor(title) {
		this.title = title;
		this.items = [];
	}

	addItem(item) {
		this.items.push(item);
	}
}

export default Project;
