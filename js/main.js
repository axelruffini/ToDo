// Función para agregar una tarea
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
    // Obtener tareas existentes de LocalStorage o inicializar un array vacío si es la primera vez
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Agregar la nueva tarea al array
    tasks.push(taskText);

    // Guardar el array actualizado en LocalStorage
    localStorage.setItem('tasks', JSON.stringify(tasks));

    // Limpiar el input y actualizar la lista de tareas mostradas
    taskInput.value = '';
    displayTasks();
  }
}

// Función para mostrar las tareas en el main
function displayTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  // Obtener las tareas de LocalStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Mostrar cada tarea en el main
  tasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.innerHTML = `
    <div class="nueva-tarjeta">
      <span>${task}</span>
        <button onclick="deleteTask(${index})" class="btn">
          <img src="./assets/img/Eliminar.svg" alt="">
        </button>
    </div>
    `;
    taskList.appendChild(taskElement);
  });
}

// Función para eliminar una tarea
function deleteTask(index) {
  // Obtener las tareas de LocalStorage
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

  // Eliminar la tarea del array según el índice proporcionado
  if (index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
  }

  // Guardar el array actualizado en LocalStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));

  // Actualizar la lista de tareas mostradas
  displayTasks();
}

// Mostrar las tareas al cargar la página
displayTasks();
