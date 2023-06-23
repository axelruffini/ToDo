

const formulario = document.querySelector('form');
const nombreTareaInput = document.querySelector('#nombre-tarea');
const descTareaInput = document.querySelector('#desc-tarea');
const contenedorTareas = document.querySelector('#contenedor-tareas');

function agregarFuncionalidadEliminarTarea(tareaDiv, tareas, index) {
  const botonEliminar = document.createElement('button');
  botonEliminar.textContent = 'Eliminar';
  botonEliminar.classList.add('btn-eliminar');
  botonEliminar.addEventListener('click', async () => {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la tarea',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });
    if (result.isConfirmed) {
      tareaDiv.remove();
      tareas.splice(index, 1);
      guardarTareasEnStorage(tareas);
      Swal.fire(
        '¡Eliminada!',
        'La tarea ha sido eliminada.',
        'success'
      );
    }
  });
  tareaDiv.appendChild(botonEliminar);

  const estadoTareaNode = document.createElement('p');
  estadoTareaNode.classList.add('estado-tarea');
  const estadoGuardado = obtenerEstadoTarea(tareas, index);
  const estadoInicial = estadoGuardado ? estadoGuardado : 'Sin Terminar';
  estadoTareaNode.textContent = `Estado: ${estadoInicial}`;
  tareaDiv.appendChild(estadoTareaNode);

  const botonEstado = document.createElement('button');
  botonEstado.textContent = 'Cambiar Estado';
  botonEstado.classList.add('btn-estado'); 
  botonEstado.addEventListener('click', () => {
    tareaDiv.classList.toggle('terminada');
    const estado = tareaDiv.classList.contains('terminada') ? 'Terminada' : 'Sin Terminar';
    estadoTareaNode.textContent = `Estado: ${estado}`;
    actualizarEstadoTarea(tareas, index, estado);
  });
  tareaDiv.appendChild(botonEstado);
}

formulario.addEventListener('submit', async (evento) => {
  evento.preventDefault();
  const nombreTareaTexto = nombreTareaInput.value.trim();
  const descTareaTexto = descTareaInput.value.trim();
  if (nombreTareaTexto && descTareaTexto) {
    const tareaDiv = document.createElement('div');
    const nombreTareaNode = document.createElement('h3');
    const descTareaNode = document.createElement('p');
    nombreTareaNode.textContent = nombreTareaTexto;
    descTareaNode.textContent = descTareaTexto;
    tareaDiv.appendChild(nombreTareaNode);
    tareaDiv.appendChild(descTareaNode);
    contenedorTareas.appendChild(tareaDiv);

    try {
      const tareas = obtenerTareasDelStorage();
      const index = tareas.length;
      agregarFuncionalidadEliminarTarea(tareaDiv, tareas, index);
      guardarTareasEnStorage(tareas.concat({ nombre: nombreTareaTexto, descripcion: descTareaTexto }));
      guardarEstadoTarea(tareas, index, 'Sin Terminar');
      nombreTareaInput.value = '';
      descTareaInput.value = '';
    } catch (error) {
      console.error('Error:', error);
    }
  }
});



function obtenerTareasDelStorage() {
  const tareas = JSON.parse(localStorage.getItem('tareas') || '[]');
  return tareas;
}

function guardarTareasEnStorage(tareas) {
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

function obtenerEstadoTarea(tareas, index) {
  const estado = JSON.parse(localStorage.getItem(`estado_${index}`));
  return estado;
}

function guardarEstadoTarea(tareas, index, estado) {
  localStorage.setItem(`estado_${index}`, JSON.stringify(estado));
}

function actualizarEstadoTarea(tareas, index, estado) {
  guardarEstadoTarea(tareas, index, estado);
}

const btnBorrarTodas = document.querySelector('#btn-borrar-todas');

function borrarTodasLasTareas() {
  while (contenedorTareas.firstChild) {
    contenedorTareas.removeChild(contenedorTareas.firstChild);
  }
  localStorage.clear();
}

btnBorrarTodas.addEventListener('click', async () => {
  const result = await Swal.fire({
    icon: 'warning',
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará todas las tareas',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar todas',
    cancelButtonText: 'Cancelar'
  });
  if (result.isConfirmed) {
    borrarTodasLasTareas();
    Swal.fire(
      '¡Eliminadas!',
      'Todas las tareas han sido eliminadas.',
      'success'
    );
  }
});

async function cargarTareas() { 
  try {
    const tareasLocalStorage = obtenerTareasDelStorage();
    mostrarTareas(tareasLocalStorage);
  } catch (error) { 
    console.error('Error:', error);
  }
}


function mostrarTareas(tareas) {
  for (const tarea of tareas) {
    const tareaDiv = document.createElement('div');
    const nombreTareaNode = document.createElement('h3');
    const descTareaNode = document.createElement('p');
    nombreTareaNode.textContent = tarea.nombre || tarea.title;
    descTareaNode.textContent = tarea.descripcion || '';
    tareaDiv.appendChild(nombreTareaNode);
    tareaDiv.appendChild(descTareaNode);
    tareaDiv.classList.add('tarea-agregada');
    contenedorTareas.appendChild(tareaDiv);
    const index = tareas.indexOf(tarea);
    agregarFuncionalidadEliminarTarea(tareaDiv, tareas, index);
  }
}

window.addEventListener('load', cargarTareas);

function filtrarTareasPorNombre(tareas, nombre) {
  return tareas.filter(tarea => tarea.nombre.toLowerCase().includes(nombre.toLowerCase()));
}

function limpiarContenedorTareas() {
  while (contenedorTareas.firstChild) {
    contenedorTareas.removeChild(contenedorTareas.firstChild);
  }
}

function buscarTareas() {
  const busquedaInput = document.querySelector('#busqueda');
  const nombreBusqueda = busquedaInput.value.trim();
  if (nombreBusqueda) {
    const tareas = obtenerTareasDelStorage();
    const tareasFiltradas = filtrarTareasPorNombre(tareas, nombreBusqueda);
    limpiarContenedorTareas();
    mostrarTareas(tareasFiltradas);
  } else {
    limpiarContenedorTareas();
    mostrarTareas(obtenerTareasDelStorage());
  }
}

const btnBuscar = document.querySelector('#btn-buscar');
btnBuscar.addEventListener('click', buscarTareas);
