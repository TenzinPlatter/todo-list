import { nanoid } from "nanoid";
import { getCurrentDate } from "../index";

class Project {
	constructor(title) {
		this.title = title;
		this.items = [];
		this.uid = nanoid();
		this.creationDate = getCurrentDate();
	}

	addItem(item) {
		this.items.push(item);
	}

	isEmpty() {
		return this.items.length == 0;
	}
}

export default Project;
