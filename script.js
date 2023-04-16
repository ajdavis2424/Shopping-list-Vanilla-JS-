//Get the form 1st
const itemForm = document.getElementById('item-form');

// Get input
const itemInput = document.getElementById('item-input');

// Get item list
const itemList = document.getElementById('item-list');

//addItem event listner function: pass in event object
const addItem = (e) => {
  //preventdefault on event object so it doesn't submit
  e.preventDefault();

  // Value being typed in
  const newItem = itemInput.value;

  //Validate input-- value being typed in
  if (newItem === '') {
    alert('Please add an item');
    return;
  }
  //Create list item
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  const button = createButton('remove-item btn-link text-red');
  li.appendChild(button);

  //Add it all to the DOM
  itemList.appendChild(li);

  itemInput.value = '';
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

// Event Listners
itemForm.addEventListener('submit', addItem);
