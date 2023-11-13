// Global variables ------------
// form
const itemForm = document.getElementById('item-form');
// form input
const itemInput = document.getElementById('item-input');
// Item list
const itemList = document.getElementById('item-list');
// clear btn
const clearbtn = document.getElementById('clear');
// item filter
const itemFilter = document.getElementById('filter');

// functions ----------------

// create button  >>>>>>>>>
function createButton(classes) {
  const button = document.createElement('button');
  button.className = classes;
  const icon = createIcon('fa-solid fa-xmark');
  button.appendChild(icon);
  return button;
}

// create icon >>>>>>>>>
function createIcon(classes) {
  const icon = document.createElement('i');
  icon.className = classes;
  return icon;
}

// load items from storage display on DOM>>>>>>>>>
function displayItems() {
  const itemsFromStorage = getItemsFromStorage();
  // add items to DOM
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item);
    checkUI();
  });
}

// create list item  >>>>>>>>>
function onAddItemSubmit(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // validate input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }
  // create item DOM element
  addItemToDOM(newItem);
  // add item to local storage
  addItemToStorage(newItem);
  checkUI();
  // reset input value
  itemInput.value = '';
}

// add item to DOM >>>>>>>>
function addItemToDOM(item) {
  //   create list item with value input
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(item));

  //   create button
  const button = createButton('remove-item btn-link text-red');
  //   add button to li item
  li.appendChild(button);
  console.log(li);
  //   add item list to DOM
  itemList.appendChild(li);
}

// add item to storage >>>>>>>>
function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage();

  // add new item to an array
  itemsFromStorage.push(item);

  // convert to JSON string and set to local storage
  localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

// get items from storage
function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem('items') === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem('items'));
  }
  return itemsFromStorage;
}
// ________________________________
// removing items
// -----------------------
// remove item >>>>>>>>>
function removeItem(e) {
  // targets cross icon
  if (e.target.parentElement.classList.contains('remove-item')) {
    if (confirm('Are you sure?')) {
      e.target.parentElement.parentElement.remove();
      checkUI();
    }
  }
}

// clear button >>>>>>
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
}

// ________________________________

// filters items >>>>>>
function filterItems(e) {
  const items = itemList.querySelectorAll('li');
  const text = e.target.value.toLowerCase();
  console.log(text);
  // loop through items
  items.forEach((item) => {
    // text content of item
    const itemName = item.firstChild.textContent.toLowerCase();
    // match item with input in filter
    if (itemName.indexOf(text) !== -1) {
      // display matching items
      item.style.display = 'flex';
    } else {
      item.style.display = 'none';
    }
  });
}

// check items / state >>>>>>>
function checkUI() {
  // list items node
  const items = itemList.querySelectorAll('li');
  if (items.length === 0) {
    clearbtn.style.display = 'none';
    itemFilter.style.display = 'none';
  } else {
    clearbtn.style.display = 'block';
    itemFilter.style.display = 'block';
  }
}

// Initialize app
function init() {
  // event listeners ----------
  // add an item
  itemForm.addEventListener('submit', onAddItemSubmit);
  // remove item
  itemList.addEventListener('click', removeItem);
  // clear all items
  clearbtn.addEventListener('click', clearItems);
  // filter items
  itemFilter.addEventListener('input', filterItems);
  // load items in storage if available
  document
    .addEventListener('DOMContentLoaded', displayItems)
    // check items then toggle filter & clear display
    .checkUI();
}

init();
