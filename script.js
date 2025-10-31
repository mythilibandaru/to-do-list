const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

// Load existing tasks
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);

function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return alert("Please enter a task!");

  const li = createTaskElement(taskText);
  taskList.appendChild(li);

  saveTask(taskText);
  input.value = "";
}

function createTaskElement(text) {
  const li = document.createElement("li");
  li.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.classList.add("delete-btn");

  li.appendChild(deleteBtn);

  li.addEventListener("click", function () {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  deleteBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    li.remove();
    updateLocalStorage();
  });

  return li;
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: task, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => {
    const li = createTaskElement(task.text);
    if (task.completed) li.classList.add("completed");
    taskList.appendChild(li);
  });
}

function updateLocalStorage() {
  const tasks = [];
  document.querySelectorAll("#task-list li").forEach((li) => {
    tasks.push({ text: li.childNodes[0].textContent, completed: li.classList.contains("completed") });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
