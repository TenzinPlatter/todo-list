import Item from "./js/item";
import Project from "./js/project";
import UIController from "./js/uiController";
import "./styles.css";

function getCurrentDate(offset = 0) {
	const today = new Date();
	let date = new Date(today.setDate(today.getDate() + offset));

	let month = date.getMonth() + 1;
	let day = date.getDate();

	return `${day}-${month}`;
}


const display = new UIController();
const daily = new Project("Today");
const projectContainer = document.createElement("div");

for (let i = 1; i < 4; i++) {
	let item = new Item("Hello", "category", getCurrentDate(i - 1), i);
	daily.addItem(item);
}

display.addProjectDOM(daily, projectContainer);

onbeforeunload = (event) => {
	// will be called when tab is closed
	//TODO: store all projects
}

export { getCurrentDate };
