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
      // acknowledge QuotaExceededError only if there's something already stored
      storage &&
      storage.length !== 0
    );
  }
}

let storedProjects = null;

if (storageAvailable("localStorage")) {
	storedProjects = localStorage.getItem("storedProjects");
}

if (storedProjects) {
	for (const project of storedProjects) {
		display.addProject(project);
	}
}
