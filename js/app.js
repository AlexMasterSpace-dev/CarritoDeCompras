const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = []

cargarEventListeners();
function cargarEventListeners() {
    listaCursos.addEventListener('click', agregarCurso);

    //Elimina cursos del carrito

    carrito.addEventListener('click', eliminarCurso)

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
            
     limpiarHtml();
} )
}
//funciones

function agregarCurso(e) {
    e.preventDefault();
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
      const cursoId = e.target.getAttribute('data-id')        
        
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId)
        
        carritoHTML();
    }
    
}

//lee el contenido del HTML al que le dimos y traer

function leerDatosCurso(curso) {
    // console.log(curso);
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1,

    }
    //Revisa si un elemento ya existe en el carrito

    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id)
    if (existe) {
        const cursos = articulosCarrito.map(curso => {
            if (curso.id === infoCurso.id) {
                curso.cantidad++;
                return curso; //retorna el objeto actualizado
            } else {
                return curso; //retorna el que no esta actualizado
            }
        })
        articulosCarrito = [... cursos]
    } else {
        articulosCarrito = [...articulosCarrito, infoCurso]

    }


    console.log(articulosCarrito);

    carritoHTML();

}

function carritoHTML() {

    //limpiar html
    limpiarHtml();
    //Recorre el carrito Html
    articulosCarrito.forEach(curso => {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
        <img src = "${curso.imagen}" width="100">
        </td>
        <td>
          ${curso.titulo}

        </td>
         <td>
          ${curso.precio}

        </td>
        <td>
          ${curso.cantidad}

        </td>
        <td>
<a href="#" class="borrar-curso" data-id="${curso.id}"> X</a> 
        </td>
        `;
        //Agregar  el html al  contenedor
        contenedorCarrito.appendChild(row);
    })
}

function limpiarHtml() {
    // contenedorCarrito.innerHTML= '';

    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)

    }
}