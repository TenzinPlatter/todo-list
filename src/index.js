import Project from "./js/project";
import ViewController from "./js/uiController";
import StorageController from "./js/storage";
import "./styles.css";
import Item from "./js/item";

function getCurrentDate(offset = 0) {
	const today = new Date();
	let date = new Date(today.setDate(today.getDate() + offset));

	let month = date.getMonth() + 1;
	let day = date.getDate();

	return `${day}-${month}`;
}

function currentDateForHtml() {
	const today = new Date();

	let month = today.getMonth() + 1;
	let day = today.getDate();
	let year = today.getFullYear();

	return `${year}-${month}-${day}`;
}

function htmlDateToShort(date) {
	const newDate = new Date(date);
	let month = newDate.getMonth() + 1;
	let day = newDate.getDate();
	return `${day}-${month}`;
}

function getPriorityFromHTMLRadio(data) {
	if ("now" in data) {
		return 3;
	} else if ("later" in data) {
		return 2;
	} else {
		return 1;
	}
}



const display = new ViewController();
const storage = new StorageController();
let projects;

// stuff for add project modal
const addProject = document.querySelector("dialog.add-project")
const addProjectBtn = document.querySelector("#sidebar > button");
const closeProjectBtn = document.querySelector("dialog.add-project img");
const submitProjectForm = document.querySelector("dialog.add-project > form");

addProjectBtn.addEventListener("click", () => { addProject.showModal() });
closeProjectBtn.addEventListener("click", () => {
	submitProjectForm.reset();
	addProject.close()
});

submitProjectForm.addEventListener("submit", (e) => {
	addProject.close();
	e.preventDefault();
	const formData = Object.fromEntries(new FormData(e.target));
	e.target.reset();

	const proj = new Project(formData.title);
	display.addProjectDOM(proj);
	if (display.selectedProject == null) {
		display.selectProject(proj);
	}
})

//NOTE: open button for addTodo is handled when it is created in UIController
const addTodo = document.querySelector("dialog.add-todo");
const closeTodoBtn = document.querySelector("dialog.add-todo img");
const todoForm = document.querySelector("dialog.add-todo > form");

closeTodoBtn.addEventListener("click", () => {
	addTodo.close()
	todoForm.reset();
});

todoForm.addEventListener("submit", (e) => {
	addTodo.close();
	e.preventDefault();
	const data = Object.fromEntries(new FormData(e.target));
	todoForm.reset();
	console.log(data);

	const dueDate = htmlDateToShort(data.date);
	const priority = getPriorityFromHTMLRadio(data);

	const item = new Item(data.title, data.category, dueDate, priority);
	display.addTodoToCurrentProject(item);
});


if (storage.available) {
	projects = storage.getStoredProjects();
} else {
	projects = [new Project("Today")];
}

for (const project of projects) {
	display.addProjectDOM(project);
}

display.storeProjects();

export { getCurrentDate, currentDateForHtml };
