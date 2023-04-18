//Get the form 1st
const itemForm = document.getElementById('item-form');

// Get input
const itemInput = document.getElementById('item-input');

// Get item list
const itemList = document.getElementById('item-list');

//Get clear button
const clearButton = document.getElementById('clear');

// Items Filter
const itemsFilter = document.getElementById('filter');

//Get form button
const formButton = itemForm.querySelector('button');

let isEditMode = false;

//Display storage itmes in DOM
const displayItems = () => {
  const itemsFromStorage = getItemsFromStorage(itemsFilter);
  //to actually get the items from storage
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
    checkUI();
  });
};

//addItem event listner function: pass in event object
const onAddItemSubmit = (e) => {
  //preventdefault on event object so it doesn't submit
  e.preventDefault();

  // Value being typed in
  const newItem = itemInput.value;

  //Validate input-- value being typed in
  if (newItem === '') {
    alert('Please add an item');
    return;
  }
  //Check for edit mode
  if (isEditMode) {
    //remove from local storage, remove from DOM, then add new item
    const itemToEdit = itemList.querySelector('.edit-mode');

    removeItemFromStorage(itemToEdit.textContent);

    itemToEdit.classList.remove('.edit-mode');
    itemToEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExists(newItem)) {
      alert('That item already exists!');
      return;
    }
  }

  //Create item DOM element
  addItemToDOM(newItem);

  //add iteme to local storage
  addItemToStorage(newItem);

  checkUI();

  itemInput.value = '';
};

const addItemToDOM = (item) => {
  //Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  //Add it all to the DOM
  itemList.appendChild(li);
};

const createButton = (classes) => {
  // Create button
  const button = document.createElement('button');

  //add class to button
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);

  return button;
};

const createIcon = (classes) => {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
};

const addItemToStorage = (item) => {
  //array of items in local storage
  let itemsFromStorage;
  //check to see if therer are no items in storage
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    //Parse makes it an array, and them into itemsFromStorage variable
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  //new item and add to array
  itemsFromStorage.push(item);

  //Convert to JSON string and set local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const getItemsFromStorage = (items) => {
  let itemsFromStorage;
  //check to see if there are no items in storage
  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    //Parse makes it an array, and them into itemsFromStorage variable
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
};

const onClickItem = (e) => {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement);
  } else {
    setItemToEdit(e.target);
  }
};

const checkIfItemExists = (item) => {
  //get items from local storage
  const itemsFromStorage = getItemsFromStorage();

  return itemsFromStorage.includes(item);
};

const setItemToEdit = (item) => {
  isEditMode = true;

  itemList.querySelectorAll('li').forEach((i) => {
    i.classList.remove('edit-mode');
  });

  item.classList.add('edit-mode');
  formButton.innerHTML = '<i class = "fa-solid fa-pen"></i> Update Item';
  formButton.style.backgroundColor = '#228B22';
  itemInput.value = item.textContent;
};

//put event on item list and travers up to remove the list item and nothing else. element passed in is the actual element comin from onClickItem
const removeItem = (item) => {
  if (confirm('Are you sure')) {
    //Remove item from DOM
    item.remove();

    //Remove item from local storage
    removeItemFromStorage(item.textContent);

    checkUI();
  }
};

const removeItemFromStorage = (item) => {
  let itemsFromStorage = getItemsFromStorage();

  //filter out item to be removed- set itemsFromStorage to the filtered array
  itemsFromStorage = itemsFromStorage.filter((i) => i !== item);

  //Reset to localstorage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
};

const clearAllItems = () => {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  //Clear from local storage
  localStorage.removeItem('items');

  checkUI();
};

const filterItems = (e) => {
  // get text that is being typed
  const text = e.target.value.toLowerCase();
  // Get itemslist
  const items = itemList.querySelectorAll('li');

  //  loopthrough
  items.forEach((item) => {
    // get text contentof each  item --- first child is the text
    const itemName = item.firstChild.textContent.toLowerCase();

    // if text thats typed in matches the item name(true), if false = -1
    if (itemName.indexOf(text) != -1) {
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
};

//Check UI to dsee if there are items
const checkUI = () => {
  itemInput.value = '';

  //Get items
  const items = itemList.querySelectorAll('li');

  if (items.length === 0) {
    clearButton.style.display = 'none';
    itemsFilter.style.display = 'none';
  } else {
    clearButton.style.display = 'block';
    itemsFilter.style.display = 'block';
  }
  formButton.innerHTML = '<i class="fa-solid fa-plus"</i> Add Item';
  formButton.style.backgroundColor = '#333';
  isEditMode = false;
};

//Initialize app
function init() {
  // Event Listners
  itemForm.addEventListener('submit', onAddItemSubmit);
  itemList.addEventListener('click', onClickItem);
  clearButton.addEventListener('click', clearAllItems);
  itemsFilter.addEventListener('input', filterItems);
  document.addEventListener('DOMContentLoaded', displayItems);
  checkUI();
}

init();
