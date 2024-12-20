import { nanoid } from "nanoid"

class Item {
	constructor(title, category, dueDate, priority) {
		this.title = title;
		this.category = category;
		this.dueDate = dueDate;
		this.priority = priority;
		this.done = false;
		this.uid = nanoid();
	}

	toggleDone() {
		this.done = !this.done;
		return this.done;
	}

	get isDone() {
		return this.done;
	}
}

export default Item;
