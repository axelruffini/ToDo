const formulario = document.querySelector('form'); 
const nombreTareaInput = document.querySelector('#nombre-tarea');
const contenedorTareas = document.querySelector('#contenedor-tareas');

formulario.addEventListener('submit', (evento) => { //Se carga la tarea
  evento.preventDefault();
  const nombreTareaTexto = nombreTareaInput.value.trim();

  if (nombreTareaTexto) { //Comprueba si se escribio algo
    const tareaDiv = document.createElement('div');
    const nombreTareaNode = document.createElement('h3');
    nombreTareaNode.textContent = nombreTareaTexto;
    tareaDiv.appendChild(nombreTareaNode);
    tareaDiv.classList.add('contenedor-tarjeta');
    contenedorTareas.appendChild(tareaDiv);
    guardarTareaEnStorage(nombreTareaTexto);
    nombreTareaInput.value = '';
  }
});

function guardarTareaEnStorage(nombreTarea) { //se la guada en el storage
  const tareas = obtenerTareasDelStorage();
  tareas.push({ nombre: nombreTarea });
  guardarTareasEnStorage(tareas);
}

function guardarTareasEnStorage(tareas) { //SE GUARDA LA TAREA EN EL STORAGE
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

////////////////////////////// Se obtienen las tareas almacenadas en el storage y se cargan, finalmente las muestra

function obtenerTareasDelStorage() {  //Se encarga de obtener las tareas almacenadas en el almacenamiento local. 
  const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
  return tareas;
}

function mostrarTareas(tareas) { //Se enfoca en la creación de elementos HTML y la presentación de las tareas en la página
  for (const tarea of tareas) {
    const tareaDiv = document.createElement('div');
    const nombreTareaNode = document.createElement('h3');
    nombreTareaNode.textContent = tarea.nombre;
    tareaDiv.appendChild(nombreTareaNode);
    tareaDiv.classList.add('contenedor-tarjeta'); // Agrega la clase "contenedor-tarjeta" al div de la tarea
    contenedorTareas.appendChild(tareaDiv);
  }
}

function cargarTareas() { //Coordina la obtención y visualización de las tareas
  const tareasLocalStorage = obtenerTareasDelStorage();
  mostrarTareas(tareasLocalStorage);
}

window.addEventListener('load', cargarTareas); //Ejecuta la funcion cargarTareas()