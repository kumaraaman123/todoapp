"use strict";

const itemNameEL = document.getElementById("inputData");
const quantityEL = document.getElementById("quantityInput");
const addBtn = document.getElementById("addBtn");
const orderListEl = document.getElementById("orderList");

let editItemId;
let isEditing = false;

let items = [];

const init = () => {
  const olLength = orderListEl.innerHTML.length;
  olLength === 0
    ? (orderListEl.style.display = "none")
    : (orderListEl.style.display = "block");
};

const showItem = (values) => {
  orderListEl.style.display = "block";
  orderListEl.innerHTML = null;
  values.map((item) => {
    addData({ ...item });
  });
  if (items.length === 0) {
    orderListEl.style.display = "none";
  }
};

addBtn.addEventListener("click", () => {
  const itemName = itemNameEL.value.toLowerCase();
  const itemNameChanged = itemName[0].toUpperCase() + itemName.slice(1);
  const quantityValue = quantityEL.value;
  if (addBtn.value === "Update") {
    updateValue(itemNameChanged, quantityValue);
  } else {
    const input = {
      id: `${Date.now()}`,
      itemName: `${itemNameChanged}`,
      quantity: `${quantityValue}`,
    };
    items.push(input);
    if (itemNameEL.value && quantityEL.value) {
      showItem(items);
    } else {
      alert("Input Field Is Mandatory");
    }
  }
  itemNameEL.value = null;
  quantityEL.value = null;
});

const addData = ({ id, itemName, quantity }) => {
  const listEl = document.createElement("li");
  listEl.className = "listOutput";
  listEl.id = `${id}`;
  listEl.innerHTML = `
    <span class="spanItem">${itemName}</span> 
    <span class="spanQuantity">${quantity}</span>
    <button class="editBtn" id="editBtn" onclick="editItem(${id})">
      <i class='fas fa-pen'></i>
    </button>
    <button class="deleteBtn" id=${id} onclick="deleteItem(this)">
    <i class="material-icons">delete</i>
    </button>`;
  orderListEl.appendChild(listEl);
};

const deleteItem = (e) => {
  const selectedId = e.parentElement.id;
  items = items.filter((value) => value.id != selectedId);
  showItem(items);
};

const editItem = (id) => {
  if (!isEditing) {
    addBtn.value = "Update";
    const editBtn = orderListEl.querySelectorAll(".editBtn");
    editItemId = items.find((item) => item.id == id);

    itemNameEL.value = editItemId.itemName;
    quantityEL.value = editItemId.quantity;
    isEditing = true;
  } else {
    alert("Already an item is being edited");
  }
};

const updateValue = (itemNameChanged, quantityValue) => {
  const updatedValue = items.map((value) => {
    if (editItemId.id === value.id) {
      return {
        ...value,
        itemName: itemNameChanged,
        quantity: quantityValue,
      };
    } else {
      return value;
    }
  });
  showItem(updatedValue);
  addBtn.value = "Add";
  itemNameEL.value = null;
  quantityEL.value = null;
};

init();