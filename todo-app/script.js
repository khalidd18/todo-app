const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

// Load saved tasks
document.addEventListener('DOMContentLoaded', loadTasks);

addBtn.addEventListener('click', () => {
  const task = input.value.trim();
  if (task !== '') {
    addTask(task);
    saveTask(task);
    input.value = '';
  }
});

function addTask(taskText, completed = false) {
  const li = document.createElement('li');
  li.textContent = taskText;

  if (completed) {
    li.classList.add('completed');
  }

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    toggleTask(taskText);
  });

  li.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    removeTask(taskText);
    li.remove();
  });

  taskList.appendChild(li);
}

function saveTask(taskText) {
  const tasks = getTasks();
  tasks.push({ text: taskText, completed: false });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

function loadTasks() {
  const tasks = getTasks();
  tasks.forEach(task => addTask(task.text, task.completed));
}

function toggleTask(taskText) {
  const tasks = getTasks();
  const updatedTasks = tasks.map(task =>
    task.text === taskText
      ? { ...task, completed: !task.completed }
      : task
  );
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}

function removeTask(taskText) {
  const tasks = getTasks();
  const updatedTasks = tasks.filter(task => task.text !== taskText);
  localStorage.setItem('tasks', JSON.stringify(updatedTasks));
}
