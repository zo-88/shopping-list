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
  checkUI();

  // reset input value
  itemInput.value = '';
}

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

// event listeners ----------
// add an item
itemForm.addEventListener('submit', addItem);
itemList.addEventListener('click', removeItem);
clearbtn.addEventListener('click', clearItems);
itemFilter.addEventListener('input', filterItems);

checkUI();
