//Variables

const $listaCursos = document.getElementById('lista-cursos');
const $carrito = document.getElementById('carrito')
const $listaCarrito = document.querySelector('tbody')
const $btnVaciar = document.getElementById('vaciar-carrito')


//Listeners
eventos();

function eventos(){
  $listaCursos.addEventListener('click', agregarCarrito) 

  $listaCarrito.addEventListener('click', eliminarCurso)

  $btnVaciar.addEventListener('click', vaciarCarrito)

  //al cargar el documento carga los datos del localStorage
  document.addEventListener('DOMContentLoaded', leerLocalStorage)
}

//Funciones

function agregarCarrito(e){
  e.preventDefault();
  
  if(e.target.classList.contains('agregar-carrito')){
    
    const $curso = e.target.parentElement.parentElement;
    leerCursoSeleccionado($curso);

  }
}


//Guardo la informacion del curso antes de enviarlo al
//carrito

function leerCursoSeleccionado($curso){
  const curso ={
    name: $curso.querySelector('.info-card').querySelector('h4').textContent,
    image: $curso.querySelector('.imagen-curso').src, 
    price: $curso.querySelector('.precio span').textContent,
    id: $curso.querySelector('a').getAttribute('data-id')

  }

  //Envio el obj a la funcion para insertar los datos en el carro
  insertarCarrito(curso);
}



// inserta el html y muestra los datos del obj
function insertarCarrito(curso){
  
  const newProducto= document.createElement('tr')
  newProducto.innerHTML = `
    
      <td>
      <img src="${curso.image}" width=100>
      
      </td>
      <td>
          ${curso.name}
      </td>
      <td>
          ${curso.price}
      </td>
      <td>
         <a href="#" class="borrar-curso" data-id="${curso.id}">
          ❌
        </a> 
      </td>
  
  `

  $listaCarrito.appendChild(newProducto)

  //Despues de agregar el curso al carrito 
  //lo enviamos al localstorage
  guardarLocalStorage(curso);
}


function eliminarCurso(e){
  e.preventDefault();
  let cursoEliminar, cursoID;
   
  if(e.target.classList.contains('borrar-curso')){
    e.target.parentElement.parentElement.remove()
    cursoEliminar = e.target; 
    cursoID =  cursoEliminar.getAttribute('data-id')

 
  }
    eliminarCursoLS(cursoID);

}



function vaciarCarrito(e){
  e.preventDefault();

  //forma rapida de eliminar elementos
  //Mientras haya un primer elemento dará true
  while($listaCarrito.firstChild){
    //De la tabla remueve a un hijo, luego le decimos que el primer
    $listaCarrito.removeChild($listaCarrito.firstChild)
  }//Se va a repetir  hasta borrar todo porque 
  //a medida que va eliminando el firstChild es otro tr

  
   localStorage.clear() 
  //para que no se buguee el hover
  return false;

}

//Obtiene lo que ya habia en localStorage y le agrega el nuevo curso
function guardarLocalStorage (curso){
  let cursos = obtenerLocalStorage();

  cursos.push(curso)

  localStorage.setItem('cursos',JSON.stringify(cursos))

}


//Verifica si el locaStorage esta vacio o si hay 
//cursos que los vuelva a arreglo y los retorne
function obtenerLocalStorage (){
  let cursos;
  if(localStorage.getItem('cursos') === null){
    cursos = []
  }else{
    cursos = JSON.parse(localStorage.getItem('cursos'))
  }
  return cursos
}


//Al cargar reviso que hay en LS para 
//insertar al DOM Y reutilizo el codigo de
//cuando agregue al carrito

function leerLocalStorage(){
  let cursosLS = obtenerLocalStorage();

  cursosLS.forEach(curso => {
    const newProducto= document.createElement('tr')
    newProducto.innerHTML = `
      <td>
      <img src="${curso.image}" width=100>
      
      </td>
      <td>
          ${curso.name}
      </td>
      <td>
          ${curso.price}
      </td>
      <td>
         <a href="#" class="borrar-curso" data-id="${curso.id}">
          ❌
        </a> 
      </td>  
  `

  $listaCarrito.appendChild(newProducto)
  });

}



//Eliminar del local storage

function eliminarCursoLS(CURSO_ID){
  let cursosLS =obtenerLocalStorage();


  //Recorro los cursos actuales del LocalStorage
  // y verifico si el id del dom es el mismo del 
  // cada obj recorrido, si si, se elimina del arreglo
  cursosLS.forEach((curso, index)=>{
    if(curso.id === CURSO_ID){
      cursosLS.splice(index, 1)
    }
  })


  //le enviamos el nuevo arreglo modificado a LS 
  localStorage.setItem('cursos', JSON.stringify(cursosLS))

  console.log(cursosLS)
}