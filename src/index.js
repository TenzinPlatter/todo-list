import Project from "./js/project";
import UIController from "./js/uiController";
import storageController from "./js/storage";
import "./styles.css";

function getCurrentDate(offset = 0) {
	const today = new Date();
	let date = new Date(today.setDate(today.getDate() + offset));

	let month = date.getMonth() + 1;
	let day = date.getDate();

	return `${day}-${month}`;
}

const display = new UIController();
const storage = new storageController();
let projects;

if (storage.available) {
	projects = storage.getStoredProjects();
} else {
	projects = [new Project("Today")];
}

for (const project of projects) {
	display.addProjectDOM(project);
}

onbeforeunload = (event) => {
	// will be called when tab is closed
	//TODO: store all projects
}

export { getCurrentDate };
