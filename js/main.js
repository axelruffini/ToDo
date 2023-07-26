// Función para agregar una tarea
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();
  if (taskText !== '') { 
    let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = '';
    displayTasks(tasks);
  }
}

 // Función para mostrar las tareas en el main
function displayTasks(tasks) {
  const taskList = document.getElementById('taskList');
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('nueva-tarjeta');
    const taskText = document.createElement('span');
    taskText.textContent = task;
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn');
    deleteButton.addEventListener('click', () => deleteTask(index));
    const deleteImage = document.createElement('img');
    deleteImage.src = './assets/img/Eliminar.svg';
    deleteImage.alt = '';
    deleteButton.appendChild(deleteImage);
    taskElement.appendChild(taskText);
    taskElement.appendChild(deleteButton);
    taskList.appendChild(taskElement);
  });
}

 // Función para eliminar una tarea
function deleteTask(index) {
  let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));
  displayTasks(tasks);
}


 // Mostrar las tareas al cargar la página
let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];
displayTasks(tasks);