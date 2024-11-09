import binSVG from "../assets/bin.svg";
import crossSVG from "../assets/cross.svg";
import { getCurrentDate } from "../index";

class UIController {
	constructor() {
		this.projects = [];
		this.selectedProject = null;
	}

	display() {
		this.displaySidebar();
		this.displayMain();
	}

	displayMain() {
		if (!this.selectedProject) {
			this.selectedProject = this.projects.find(
				project => project.title === "Today"
			);
		}

		const container = document.querySelector("#project-view");
		displayProject(this.selectedProject, container);
	}

	displaySidebar() {
		const sidebar = document.querySelector("#sidebar");
		const parent = document.createElement("div");
		parent.classList.add("project-titles");
		sidebar.appendChild(parent);

		for (const project of this.projects) {
			const container = document.createElement("div");
			container.classList.add("project-title");

			const text = document.createElement("p");
			text.textContent = project.title;

			const cross = document.createElement("img");
			cross.src = crossSVG;

			container.appendChild(text);
			container.appendChild(cross);

			if (project.name === "Today") {
				parent.insertBefore(container, parent.firstChild);
			} else {
				parent.appendChild(container);
			}
		}
	}

	addProject(project) {
		this.projects.push(project);
		this.display();
	}
}

function displayTodoItem(item, parent) {
	const container = document.createElement("div");
	container.classList.add("todo-item");
	container.classList.add("unfinished");

	const completeCircle = document.createElement("div");
	completeCircle.classList.add("circle" + item.priority);
	container.appendChild(completeCircle);
	completeCircle.addEventListener("click", () => {
		container.classList.toggle("unfinished");
		container.classList.toggle("finished");
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
	dueDateContainer.classList.add("due-date");
	container.appendChild(dueDateContainer);

	if (item.dueDate === getCurrentDate()) {
		dueDateContainer.textContent = "Today"
	} else if (item.dueDate === getCurrentDate(1)) {
		dueDateContainer.textContent = "Tomorrow";
	} else {
		dueDateContainer.textContent = item.dueDate;
	}

	const imgContainer = document.createElement("div");
	imgContainer.classList.add("bin");
	const img = document.createElement("img");
	img.src = binSVG;
	imgContainer.appendChild(img);
	container.appendChild(imgContainer);

	imgContainer.addEventListener("click", () => {
		parent.dispatchEvent(
			new CustomEvent("removedTodoItem", { bubbles: true, })
		)
	})

	parent.appendChild(container);
	return container;
}

function displayProject(project, parent) {
	const container = document.createElement("div");
	container.classList.add("project");

	const title = document.createElement("div");
	title.classList.add("title");
	title.textContent = project.title;
	container.appendChild(title);

	const startBar = document.createElement("div");
	startBar.classList.add("bar");
	container.appendChild(startBar);

	for (let i = 0; i < project.items.length; i++) {
		const itemContainer = document.createElement("div");

		displayTodoItem(project.items[i], itemContainer);
		const bar = document.createElement("div");
		bar.classList.add("bar");
		itemContainer.appendChild(bar);

		container.appendChild(itemContainer);
		itemContainer.addEventListener("removedTodoItem", () => {
			container.removeChild(itemContainer);
		});
	}

	parent.appendChild(container);
	return container;
}

export default UIController;
