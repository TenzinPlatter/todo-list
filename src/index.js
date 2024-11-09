import Item from "./js/item";
import Project from "./js/project";
import "./styles.css";

function displayTodoItem(item, parent) {
	const container = document.createElement("div");
	container.classList.add("todo-item");

	const completeCircle = document.createElement("div");
	completeCircle.classList.add("circle" + item.priority);
	container.appendChild(completeCircle);
	completeCircle.addEventListener("click", () => {
		let done = item.toggleDone();
		if (done) {
			completeCircle.classList.remove("unfinished");
			completeCircle.classList.add("finished");
			parent.removeChild(container);
		}
	});

	const titleContainer = document.createElement("div");
	titleContainer.textContent = item.title;
	titleContainer.classList.add("title" + item.priority);
	container.appendChild(titleContainer);

	const categoryContainer = document.createElement("div");
	categoryContainer.textContent = item.category;
	categoryContainer.classList.add("category");
	container.appendChild(categoryContainer);

	const dueDateContainer = document.createElement("div");
	dueDateContainer.textContent = item.dueDate;
	dueDateContainer.classList.add("due-date");
	container.appendChild(dueDateContainer);

	parent.appendChild(container);
	return container;
}

function displayProject(project, parent) {
	const finalBar = document.createElement("div");

	const container = document.createElement("div");
	container.classList.add("project");

	const title = document.createElement("div");
	title.classList.add("title");
	title.textContent = project.title;
	container.appendChild(title);

	for (let i = 0; i < project.items.length; i++) {
		const bar = document.createElement("div");
		bar.classList.add("bar");
		container.appendChild(bar);
		displayTodoItem(project.items[i], container);
	}

	finalBar.classList.add("bar");
	container.appendChild(finalBar);

	parent.appendChild(container);
	mutationObserver.observe(container, { childList: true });
	return container;
}

const body = document.querySelector("body");
const project = new Project("Project!!");

for (let i = 1; i < 4; i++) {
	let item = new Item("Hello", "category", "now", i);
	console.log(item);
	project.addItem(item);
}

const projectDOM = displayProject(project, body);
