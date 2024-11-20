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

	display.addProjectDOM(new Project(formData.title));
})

//NOTE: open button for addTodo is handled when it is created in UIController
const addTodo = document.querySelector("dialog.add-todo");
const closeTodoBtn = document.querySelector("dialog.add-todo img");
const submitTodoForm = document.querySelector("dialog.add-todo > form");

closeTodoBtn.addEventListener("click", () => {
	addTodo.close()
	submitTodoForm.reset();
});

submitTodoForm.addEventListener("submit", (e) => {
	addTodo.close();
	submitTodoForm.reset();

	e.preventDefault();
	const formData = Object.fromEntries(new FormData(e.target));
	e.target.reset();

	console.log(formData);
	let date = e.date;

	// display.addTodoToCurrentProject(new Item(e.title, e.category, date, priority));
});


if (storage.available) {
	projects = storage.getStoredProjects();
} else {
	projects = [new Project("Today")];
}

for (const project of projects) {
	display.addProjectDOM(project);
}

export { getCurrentDate, currentDateForHtml };
