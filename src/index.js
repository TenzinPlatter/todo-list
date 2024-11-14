import Project from "./js/project";
import ViewController from "./js/uiController";
import storageController from "./js/storage";
import { interactionInit } from "./js/interactionController";
import "./styles.css";

function getCurrentDate(offset = 0) {
	const today = new Date();
	let date = new Date(today.setDate(today.getDate() + offset));

	let month = date.getMonth() + 1;
	let day = date.getDate();

	return `${day}-${month}`;
}

//NOTE: Start

const display = new ViewController();
const storage = new storageController();
interactionInit(display);
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
