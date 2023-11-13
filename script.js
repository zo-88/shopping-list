// Global variables ------------
// form
const itemForm = document.getElementById('item-form');

// form input
const itemInput = document.getElementById('item-input');

// list
const itemList = document.getElementById('item-list');

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

  itemInput.value = '';
}

// event listeners ----------
itemForm.addEventListener('submit', addItem);
