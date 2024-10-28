// variable selectors
const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clearBtn = document.getElementById("clear");
const itemFilter = document.getElementById("filter");

function displayItems() {
  const itemsFromStorage = getItemFromStorage();
  itemsFromStorage.forEach((item) => addItemToDOM(item));
  checkUI();
}

function onAddItemSubmit(e) {
  e.preventDefault();

  // Validate Input

  const newItem = itemInput.value;

  if (newItem === "") {
    alert("Please enter an item");
    return;
  }

  // Create List item

  // const li = document.createElement("li");
  // li.appendChild(document.createTextNode(newItem));

  // const button = createButton("remove-item btn-link text-red");
  // li.appendChild(button);

  // // Add li to the DOM
  // itemList.appendChild(li);

  // Create item DOM element

  addItemToDOM(newItem);

  // Add item ot local storage

  addItemToStorage(newItem);

  checkUI();

  itemInput.value = "";
}

// localStorage
function addItemToDOM(item) {
  // Create List item

  const li = document.createElement("li");
  li.appendChild(document.createTextNode(item));

  const button = createButton("remove-item btn-link text-red");
  li.appendChild(button);

  // Add li to the DOM
  itemList.appendChild(li);
}

// Create Button function

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

// Create icon function

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemFromStorage();

  // if (localStorage.getItem("item") === null) {
  //   itemsFromStorage = [];
  // } else {
  //   itemsFromStorage = JSON.parse(localStorage.getItem("item"));
  // }

  // Add new item to the loca storage

  itemsFromStorage.push(item);

  // Convert to JSON string and set to local storage

  localStorage.setItem("item", JSON.stringify(itemsFromStorage));
}

// Add item from local storage to screen

function getItemFromStorage(e) {
  let itemsFromStorage;

  if (localStorage.getItem("item") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("item"));
  }

  return itemsFromStorage;
}

//

function OnClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(e.target.parentElement.parentElement);
  }
}

// remove function

function removeItem(item) {
  if (confirm("Are you sure?")) {
    // Remove item from DOM
    item.remove();

    // Remove item from local storage

    removeItemFromStorage(item.textContent);

    checkUI();
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemFromStorage();

  // Filter out item to be removed

  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  // Re-set to localstorage

  localStorage.setItem("item", JSON.stringify(itemsFromStorage));
}

// Clear All

function clearItems() {
  // itemList.innerHTML = '';

  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  checkUI();
}

// filterItem

function filterItems(e) {
  const items = itemList.querySelectorAll("li");
  const text = e.target.value.toLowerCase();

  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

// checkUI

function checkUI() {
  const items = itemList.querySelectorAll("li");
  if (items.length === 0) {
    clearBtn.style.display = "none";
    itemFilter.style.display = "none";
  } else {
    clearBtn.style.display = "block";
    itemFilter.style.display = "block";
  }
}

// Initialize app

function init() {
  // Event Listeners

  itemForm.addEventListener("submit", onAddItemSubmit);
  itemList.addEventListener("click", OnClickItem);
  clearBtn.addEventListener("click", clearItems);
  itemFilter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);

  checkUI();
}

init();
