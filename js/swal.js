const btn = document.querySelector('#myBtn')
btn.addEventListener('click', () => {
    Swal.fire({
        title: 'Agregado!',
        text: 'Tarea agregada con éxito!',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    })
})
