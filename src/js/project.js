import { nanoid } from 'nanoid';

class Project {
	constructor(title) {
		this.title = title;
		this.items = [];
		this.uid = nanoid();
	}

	addItem(item) {
		this.items.push(item);
	}

	isEmpty() {
		return this.items.length == 0;
	}
}

export default Project;
