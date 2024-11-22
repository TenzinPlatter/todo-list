import binSVG from "../assets/bin.svg";
import crossSVG from "../assets/cross.svg";
import { getCurrentDate } from "../index";
import { currentDateForHtml } from "../index";

class ViewController {
	constructor(projects = []) {
		this.projects = projects;
		this.selectedProject = null;
		this.display();
	}

	storeProjects() {
		let res = [];
		for (const project of this.projects) {
			res.push({id: project.uid, project: JSON.stringify(project)});
		}
		localStorage.setItem("projects", JSON.stringify(res));
	}

	selectProject(project) {
		this.selectedProject = project;
		this.display();
	}

	display() {
		this.displaySidebar();
		this.displayMain();
		this.storeProjects();
	}

	displayMain() {
		const container = document.querySelector("#project-view");
		while (container.firstChild) {
			container.removeChild(container.firstChild);
		}

		if (!this.selectedProject) {
			// tries to select daily
			this.selectedProject = this.projects.find(
				project => project.title === "Today"
			);
		}

		// if still not none, i.e. daily project has been deleted then displays
		if (this.selectedProject) {
			displayProject(this.selectedProject, container);
		} else {
			displayAddProjectMessage();
		}
	}

	displaySidebar() {
		const sidebar = document.querySelector("#sidebar");
		const parent = document.createElement("div");
		const projectTitles = document.querySelector(".project-titles");
		removeChildren(projectTitles); // clear any titles there from last render
		projectTitles.appendChild(parent);

		for (const project of this.projects) {
			const container = document.createElement("div");
			container.classList.add("project-title");

			const text = document.createElement("p");
			text.textContent = project.title;
			text.addEventListener("click", () => {
				this.selectedProject = project;
				this.display();
			});

			const cross = document.createElement("img");
			cross.src = crossSVG;
			cross.addEventListener("click", () => {
				sidebar.dispatchEvent(
					new CustomEvent("removeProject", {
						detail: project.uid,
						bubbles: true,
					}));

				parent.removeChild(container);
			});

			container.appendChild(text);
			container.appendChild(cross);
			container.addEventListener("click", (e) => {
				if (!cross.contains(e.target)) {
					this.selectedProject = project;
					this.display();
				}
			});

			if (project.title === "Today") {
				parent.insertBefore(container, parent.firstChild);
			} else {
				// parent.insertBefore(container, parent.lastChild);
				parent.appendChild(container);
			}
		}

		sidebar.addEventListener("removeProject", (e) => {
			let id = e.detail;
			this.projects = this.projects.filter(p => p.uid != id);
			if (this.selectedProject && this.selectedProject.uid === id) {
				this.selectedProject = null;
			}

			this.display();
		});
	}

	addTodoToCurrentProject(item) {
		this.selectedProject.addItem(item);
		this.display();
	}

	addProjectDOM(project) {
		this.projects.push(project);
		this.display();
	}
}

function displayTodoItem(item, parent) {
	const container = document.createElement("div");
	container.classList.add("todo-item");
	if (!item.done) {
		container.classList.add("unfinished");
	} else {
		container.classList.add("finished");
	}
	container.id = item.uid;

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
			new CustomEvent("removeTodoItem", {
				bubbles: true,
				detail: item.uid,
			})
		)
	})

	parent.appendChild(container);
	return container;
}

function displayProject(project, parent) {
	const container = document.createElement("div");
	container.classList.add("project");
	container.id = project.uid;

	const header = document.createElement("div");
	header.classList.add("header");

	const title = document.createElement("div");
	title.classList.add("title");
	title.textContent = project.title;

	const addItemBtn = document.createElement("button");
	const addTodo = document.querySelector("dialog.add-todo");
	addItemBtn.textContent = "Add Todo";
	const dateInputTodo = document.querySelector("#date-todo");
	addItemBtn.addEventListener("click", () => {
		addTodo.showModal();
		dateInputTodo.value = currentDateForHtml();
	})

	header.appendChild(title);
	header.appendChild(addItemBtn);
	container.appendChild(header);

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
		itemContainer.addEventListener("removeTodoItem", (e) => {
			let id = e.detail;
			container.removeChild(itemContainer);
			project.removeTask(id);
			if (project.items.length == 0) {
				displayAddItemsMessage(container);
			}
		});
	}

	if (project.items.length == 0) {
		displayAddItemsMessage(container);
	}

	parent.appendChild(container);
	return container;
}

function displayAddProjectMessage() {
	const mainView = document.querySelector("#project-view")
	const container = document.createElement("div");
	const top = document.createElement("h1");
	const bottom = document.createElement("h1");

	top.textContent = "No projects yet...";
	bottom.textContent = "Try adding one!";

	top.classList.add("new-project-text");
	bottom.classList.add("new-project-text");

	container.appendChild(top);
	container.appendChild(bottom);
	mainView.appendChild(container);
}

function displayAddItemsMessage(container) {
	const outer = document.createElement("div");
	const top = document.createElement("h1");
	const bottom = document.createElement("h1");

	// needs this but not necessary in project version
	outer.classList.add("new-items-text-container");

	top.textContent = "No items yet...";
	bottom.textContent = "Try adding one!";

	top.classList.add("new-items-text");
	bottom.classList.add("new-items-text");

	outer.appendChild(top);
	outer.appendChild(bottom);
	container.appendChild(outer);
}

function removeChildren(container) {
	while (container.firstChild) {
		container.removeChild(container.lastChild);
	}
}

export default ViewController;
