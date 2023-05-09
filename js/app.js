// Seleccionar con query selector los elementos que se usaran
// HAcer una funcion donde contengan los listeners que se usaran
//Añadir listener en la lista de cursos para que se agregue cuando se de click en "Agregar a carrito".
//Variables
//Funciones: agregar al carrito, y agregar un if que contenga la clase para evita el event bubbling

const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos"); //Para que abarque todos los cursos
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const btnVaciar = document.querySelector("#vaciar-carrito");
//Definir variable del carrito que se va ir llenando (array vacio)
let carroAcc = [];

listeners(); //Aqui la funcion listeners se manda llamar
function listeners() {
  listaCursos.addEventListener("click", agregarAlCarrito); //Aqui la funcion agregarAlCarrito se manda llama
  carrito.addEventListener("click", removeCurso); //Eliminar cursos del carrito
  document.addEventListener("DOMContentLoaded", () => {
    //A carroAcc asignale el resultado de getITem
    carroAcc = JSON.parse(localStorage.getItem("savedCourses")) || [];
    carritoHTML();
  });
  btnVaciar.addEventListener("click", () => {
    carroAcc = [];
    limpiarHTML();
  });
}

function agregarAlCarrito(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    // console.log(e.target.parentElement.parentElement); E.target es para ver a las caracteristicas del elemento al que se le dio click
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerInfo(cursoSeleccionado);
    //Para ver el padre es e.target.parentElement.parentElement
  }
}
//Se deben seleccionar selectores que abarquen todo el espacio que se utiliza para la accion
function removeCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    //se debe obtener un id del curso seleccionado para solo borrar uno

    const idEliminar = e.target.getAttribute("data-id");
    //Eliminar del arreglo por el data - id
    const cursoEliminado = carroAcc.filter(
      (elemento) => elemento.id !== idEliminar
    );
    carroAcc = [...cursoEliminado];
  }

  carritoHTML();
}

//Leer los datos que seleccionamos de la lista de cursos
//Y extrae la informacion del curso
function leerInfo(curso) {
  //Argumento que puede ser llamado como sea pero se refiere al cursoSeleccionado

  //Construir dentro de la funcion un objeto de manera dinamica con los elementos del card
  const infoCard = {
    img: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent, //textContent para extraer el texto
    precio: curso.querySelector("span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"), //Cada curso tiene un id
    cantidad: 1, //Cantidad que se va estar sumando en cada click
  };
  //Revisar si este elemento ya existe con .some(itera sobre un arreglo de objetos y verifica si ya existe en él)
  const existe = carroAcc.some((elem) => elem.id === infoCard.id);
  if (existe) {
    //     //iterar con un map para que regrese un nuevo array
    //     //Iterar en cada uno de los cursos, identificar cual es el id del que esta duplicado y
    //     //aumentar la cantidad (actualizar la cantidad)
    const sumCantidad = carroAcc.map((curso) => {
      if (curso.id === infoCard.id) {
        curso.cantidad++;
        return curso; //Se tiene que retornar ese valor al nuevo arreglo (objeto actualizado)
      } else {
        return curso; //Cursos no duplicados de todas maneras se tiene que retornar su valor(Retorna los objetos que no son los duplicados)
      }
    });
    carroAcc = [...sumCantidad]; //EL antiguo array copia los valores del array actualizado
  } else {
    //     //Agregar el curso al carrito de compras
    //     //al carro inicial agregale una copia de ese mismo carrito actual y ve agregando el objeto infoCard que se de click
    carroAcc = [...carroAcc, infoCard];
  }

  carritoHTML();
}

//muestra el carrito de compras enel HTML
//ITerar cada articulo con un forEach pasando como argumento el curso
//crear un elemento que se conoce como table row createElement(tr)

//y con innerHTML mostrarlo en un template strign mostrarlo en HTML
//
function carritoHTML() {
  limpiarHTML();
  carroAcc.forEach((elem) => {
    console.log(elem);
    //Iterando sobre el carrito de compras
    const row = document.createElement("tr");

    const { img, titulo, precio, cantidad, id } = elem; //object destructuring

    row.innerHTML = `
<td>
<img src="${img}" width="100">
</td>
<td>${titulo}</td>
<td>${precio}</td>
<td>${cantidad}</td>
<td> <a href= "#"   class = "borrar-curso"  data-id= ${id}> X </a>
</td>`;

    contenedorCarrito.appendChild(row); //agrega el HTML DEl carrito en el tbody con appendChild
  });
  saveStorage();
}

function saveStorage() {
  //JSON.stringify: para convertir el objeto a strings, sino marca puro object object
  localStorage.setItem("savedCourses", JSON.stringify(carroAcc));
}

function limpiarHTML() {
  contenedorCarrito.innerHTML = "";
  //Otra manera de limpiar el HTML es con un While
  //   while (contenedorCarrito.firstChild) {
  //     contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  //   }
}
