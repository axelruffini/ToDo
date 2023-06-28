const formulario = document.querySelector('form'); 
const nombreTareaInput = document.querySelector('#nombre-tarea');
const contenedorTareas = document.querySelector('#contenedor-tareas');

formulario.addEventListener('submit', (evento) => { //Se carga la tarea
  evento.preventDefault();
  const nombreTareaTexto = nombreTareaInput.value.trim();

  if (nombreTareaTexto) { //Comprueba si se escribió algo
    const tareaDiv = document.createElement('div');
    const nombreTareaNode = document.createElement('h3');
    nombreTareaNode.textContent = nombreTareaTexto;
    tareaDiv.appendChild(nombreTareaNode);
    tareaDiv.classList.add('contenedor-tarjeta'); //se agrega la clase contenedora para agregar diseño en cada una de las tareas (se la pone en esta linea asi se agrega al instante de cargarla)
    
    // Agregar botón de eliminar con diseño personalizado
    const botonEliminar = document.createElement('button');
    botonEliminar.innerHTML = '<img src="./assets/img/delete_FILL0_wght400_GRAD0_opsz48.svg" alt="Eliminar" class="btn-eliminar">'; //Imagen svg del boton borrar
    botonEliminar.addEventListener('click', () => {
      eliminarTarea({ nombre: nombreTareaTexto });
    });
    tareaDiv.appendChild(botonEliminar);
    
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

        // agrego el botón de eliminación
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.innerHTML = '<img src="./assets/img/delete_FILL0_wght400_GRAD0_opsz48.svg" alt="Eliminar" class="btn-eliminar">'; //Imagen svg del boton borrar
        botonEliminar.addEventListener('click', () => {
          eliminarTarea(tarea);
        });
        tareaDiv.appendChild(botonEliminar);

    contenedorTareas.appendChild(tareaDiv);
  }
}

function eliminarTarea(tarea) {
  const tareas = obtenerTareasDelStorage();
  const indice = tareas.findIndex((t) => t.nombre === tarea.nombre);
  if (indice !== -1) {
    tareas.splice(indice, 1);
    guardarTareasEnStorage(tareas);
    limpiarContenedorTareas();
    mostrarTareas(tareas);
  }
}

function limpiarContenedorTareas() {
  while (contenedorTareas.firstChild) {
    contenedorTareas.removeChild(contenedorTareas.firstChild);
  }
}


function cargarTareas() { //Coordina la obtención y visualización de las tareas
  const tareasLocalStorage = obtenerTareasDelStorage();
  mostrarTareas(tareasLocalStorage);
}

window.addEventListener('load', cargarTareas); //Ejecuta la funcion cargarTareas()

