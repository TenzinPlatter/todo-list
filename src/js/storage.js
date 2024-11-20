import Project from "./project";
import Item from "./item";
import { getCurrentDate } from "../index";

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
      storage.length !== 0
    );
  }
}

class StorageController {
	constructor(storageType = "localStorage") {
		this.storedProjects = [];
		this.available = storageAvailable(storageType);
	}

	storageInit() {
		let canUseStorage =  storageAvailable("localStorage");

		if (canUseStorage) {
			storedProjects = localStorage.getItem("storedProjects");
		}

		return canUseStorage;
	}

	getStoredProjects() {
		const daily = new Project("Today");
		for (let i = 1; i < 4; i++) {
			let item = new Item("Hello", "Miscellaneous", getCurrentDate(i - 1), i);
			daily.addItem(item);
		}

		const second = new Project("Second");

		this.storedProjects.push(daily);
		this.storedProjects.push(second);

		return this.storedProjects;
	}
}

export default StorageController;
