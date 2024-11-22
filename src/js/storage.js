import Project from "./project";
import Item from "./item";
import { getCurrentDate } from "../index";

function storageAvailable(type) {
  let storage;
  try {
    storage = window[type];
    const x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return (
      e instanceof DOMException &&
      e.name === "QuotaExceededError" &&
      storage.length !== 0
    );
  }
}

class StorageController {
	constructor(storageType = "localStorage") {
		this.available = storageAvailable(storageType);
	}

	getStoredProjects() {
		let storedProjects = [];
		if ("projects" in localStorage) {
			const projects = JSON.parse(localStorage.getItem("projects"));
			for (const project of projects) {
				const projectObjPlain = JSON.parse(project.project);
				let projectObj = new Project(projectObjPlain.title);
				projectObj.uid = projectObjPlain.uid;
				projectObj.creationDate = projectObj.creationDate;

				for (const itemPlain of projectObjPlain.items) {
					const todo = new Item(
						itemPlain.title,
						itemPlain.category,
						itemPlain.dueDate,
						itemPlain.priority,
					);

					todo.done = itemPlain.done;
					todo.uid = itemPlain.uid;
					projectObj.items.push(todo);
				}

				storedProjects.push(projectObj);
			}
			return storedProjects;
		}

		const daily = new Project("Today");
		let item = new Item("Welcome!!!", "Greeting", getCurrentDate(), 1);
		daily.addItem(item);
		storedProjects.push(daily);
		return storedProjects;
	}
}

export default StorageController;
