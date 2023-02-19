const form = document.getElementById("todo-form");
const list = document.getElementById("todo-list");

let todos = [];

if (localStorage.getItem("todos")) {
  todos = JSON.parse(localStorage.getItem("todos"));
  renderTodos();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("todo-input");
  const text = input.value.trim();

  if (text) {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTodos();
    input.value = "";
  }
});

function renderTodos() {
  list.innerHTML = "";
  todos.forEach((todo) => {
    const item = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("click", () => {
      todo.completed = !todo.completed;
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    });
    item.appendChild(checkbox);
    const itemText = document.createElement("p");
    itemText.appendChild(document.createTextNode(todo.text));
    item.appendChild(itemText);
    const deleteButton = document.createElement("button");
    const deleteIcon = document.createElement("span");
    deleteIcon.appendChild(document.createTextNode("delete"));
    deleteButton.appendChild(deleteIcon);
    deleteButton.classList.add("material-symbols-outlined");
    deleteButton.addEventListener("click", () => {
      todos = todos.filter((item) => item.id !== todo.id);
      localStorage.setItem("todos", JSON.stringify(todos));
      renderTodos();
    });

    item.appendChild(deleteButton);

    if (todo.completed) {
      item.classList.add("completed");
    }

    list.appendChild(item);
  });
}
