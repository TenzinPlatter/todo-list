function interactionInit(viewController) {
	const addProjectBtn = document.querySelector("#sidebar > button");
	addProjectBtn.addEventListener("click", () => {
		viewController.displayNewProjectWindow();
	});
}

export { interactionInit };
