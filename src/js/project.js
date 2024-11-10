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

	removeTask(taskID) {
		this.items = this.items.filter(t => t.uid != taskID);
	}
}

function getProjectByID(id, projects) {
	for (const project of projects) {
		if (project.uid === id) {
			return project;
		}
	}

	return null;
}

export default Project;
export { getProjectByID };
