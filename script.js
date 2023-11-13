// Global variables ------------
// form
const itemForm = document.getElementById('item-form');
// form input
const itemInput = document.getElementById('item-input');
// Item list
const itemList = document.getElementById('item-list');

// clear btn
const clearbtn = document.getElementById('clear');

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

// create list item  >>>>>>>>>
function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;

  // validate input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }
  //   create list item with value input
  const li = document.createElement('li');
  li.appendChild(document.createTextNode(newItem));

  //   create button
  const button = createButton('remove-item btn-link text-red');
  //   add button to li item
  li.appendChild(button);
  console.log(li);

  //   add item list to DOM
  itemList.appendChild(li);
  console.log(li);
  // reset input value
  itemInput.value = '';
}

// remove item >>>>>>>>>
function removeItem(e) {
  // targets cross icon
  if (e.target.parentElement.classList.contains('remove-item')) {
    e.target.parentElement.parentElement.remove();
  }
}

// clear button >>>>>>
function clearItems(e) {
  while (itemList.firstChild) {
    itemList.firstChild.removeChild(itemList.firstChild);
  }
}

// event listeners ----------
// add an item
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearbtn.addEventListener('click', clearItems);
