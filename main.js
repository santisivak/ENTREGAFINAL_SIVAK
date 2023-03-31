let productos= [];

fetch("./productos.json")
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProductos(productos);
    })


const contenedorProductos = document.querySelector("#contenedor-productos");
/* let botonesAgregar = document.querySelectorAll(".producto-agregar"); */



//Carrito de compras
let arrayCarrito;

let arrayCarritoLS = localStorage.getItem("productos-en-carrito")

if (arrayCarritoLS) {
    arrayCarrito = JSON.parse(arrayCarritoLS);
} else {
    arrayCarrito = [];
} 

//CARGAR PRODUCTOS

function cargarProductos(listaProductos) {

    contenedorProductos.innerHTML = "";

    listaProductos.forEach (e => {
       
            let card = document.createElement("div")
            card.classList.add("producto");
            card.innerHTML =`<div class="contenedorPpal">
                                <div class="card" style="width: 18rem;">
                                <img src="./img/${e.imagen}" class="card-img-top" alt="${e.nombre} de ${e.material}">
                                    <div class="card-body">
                                    <h5 class="card-title">${e.nombre} de ${e.material}</h5>
                                    <p class="card-text">Llevalo por $${e.precio}</p>
                                    <input type="button" onclick="agregarAlCarrito(${e.id})" class="btn btn-primary" value="Agregar">
                                    </div>
                                </div>
                            </div>`
            contenedorProductos.append(card);
    })
}



class ProdCarrito{
    constructor(producto, cant){
        this.producto = producto;
        this.cantidad = cant;
    }
    sumaStock(){
        this.cantidad = this.cantidad + 1
    }
}


//Agregar al carrito
function agregarAlCarrito(prod){

     Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        destination: "./carrito.html",
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ce9)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

      
      let existeCarrito = arrayCarrito.find(e => e.producto == prod)
    if(existeCarrito != undefined){
        let posicion = arrayCarrito.findIndex(elem => elem.producto == existeCarrito.producto);
        arrayCarrito[posicion].sumaStock();    
        console.table(arrayCarrito)
    }else{
        const prodCarrito = new ProdCarrito (prod, 1)
        arrayCarrito.push(prodCarrito)
        console.table(arrayCarrito)
    }
    localStorage.setItem("productos-en-carrito", JSON.stringify(arrayCarrito))
    /* const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(arrayCarrito.some(producto => producto.id === idBoton)) {
        const index = arrayCarrito.findIndex(producto => producto.id === idBoton);
        arrayCarrito[index].cantidad++;
        console.table(arrayCarrito)
    } else {
        productoAgregado.cantidad = 1;
        arrayCarrito.push(productoAgregado);
        console.table(arrayCarrito)
    }
    localStorage.setItem("productos-en-carrito", JSON.stringify(arrayCarrito)) */
}




/* function verCarrito(){
    document.body.innerHTML = ""

    for (item of arrayCarrito) {
        let card = document.createElement("div")
        let datosProd = arrayProductos.find(elem => elem.id == item.producto)

        card.innerHTML = `<div class = "card" style="width: 18rem">
            <img src="./img/${datosProd.imagen}" class = "card-img-top" alt="${datosProd.nombre} de ${datosProd.material}">
            <div class = "card-body">
            <h5 class = "card-title">${datosProd.nombre} de ${datosProd.material}</h5>
            <p class = "card-text"> Llevas ${item.cantidad}u. </p>
            </div>
            </div>`
        document.body.append(card)
    }
} */


