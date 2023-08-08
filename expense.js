var addform = document.getElementById("addForm");
var itemList = document.getElementById("items");

addform.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);

var todos = [];

// Call getFromLocalStorage() when the page loads
getFromLocalStorage();

function addItem(e) {
  e.preventDefault();

  itemList.innerHTML = "";
  var expense = document.getElementById("expense").value;
  var decrp = document.getElementById("description").value;
  var select = document.getElementById("select").value;

  const items = {
    StoreExpense: expense,
    StoreDesription: decrp,
    StoreSelect: select,
  };

  //add in array
  todos.push(items);

  //adding element to the localstorage
  localStorage.setItem("todos", JSON.stringify(todos));

  addToLocalStorage(todos);

  //it will clear the input box.
  addform.reset();
}
// function to add todos to local storage
function addToLocalStorage(todos) {
  // conver the array to string then store it.
  localStorage.setItem("todos", JSON.stringify(todos));
  // render them to screen
  renderTodos(todos);
}

function renderTodos(todos) {
  todos.forEach(function (item) {
    const divElement = document.createElement("div");
    divElement.className = "container";

    //rendering each item to the screen.
    divElement.innerHTML = `<b>Expense :</b> ${item.StoreExpense}&nbsp
            <b>Description :</b> ${item.StoreDesription}&nbsp
            <b>Category :</b> ${item.StoreSelect} &nbsp&nbsp&nbsp
            <button class="btn btn-danger btn-sm float-right delete">X</button>
            <button class="btn btn-secondary btn-sm float-right edit">Edit</button>
            <button class="btn btn-success btn-sm float-right save">✔</button>`;
    // Append the div element to the desired container
    itemList.appendChild(divElement);
  });
}
// function helps to get everything from local storage
function getFromLocalStorage() {
  const reference = localStorage.getItem("todos");
  // if reference exists
  if (reference) {
    // converts back to array and store it in todos array
    todos = JSON.parse(reference);
    renderTodos(todos);
  }
}


// Remove item
function removeItem(e) {
  if (e.target.classList.contains("delete")) {
    if (confirm("Are You Sure?")) {
      var li = e.target.parentElement;
      itemList.removeChild(li);
    }
  }
}
