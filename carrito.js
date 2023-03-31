let arrayCarrito = localStorage.getItem("productos-en-carrito");
console.log(arrayCarrito)
arrayCarrito = JSON.parse(arrayCarrito);
console.log(arrayCarrito)


const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

function cargarProductosCarrito() {

    contenedorCarritoProductos.innerHTML = "";

    arrayCarrito.forEach(e => {

        let div = document.createElement("div")
            div.classList.add("producto-carrito");
            div.innerHTML =`<div class="contenedorPpal2">
                                <div class="card" style="width: 18rem;">
                                <img src="./img/${e.imagen}" class="card-img-top" alt="${e.nombre} de ${e.material}">
                                    <div class="card-body">
                                    <h5 class="card-title">${e.nombre} de ${e.material}</h5>
                                    <p class="card-text">Te estas llevando ${e.cantidad}u por un precio de $${e.precio * e.cantidad}</p>
                                    </div>
                                </div>
                            </div>`
            contenedorCarritoProductos.append(div);
    })
    actualizarTotal();
}

cargarProductosCarrito();



botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html: `Se van a borrar ${arrayCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos.`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            arrayCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(arrayCarrito));
            cargarProductosCarrito();
        }
      })
}


function actualizarTotal() {
    const totalCalculado = arrayCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}

botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito() {

    arrayCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(arrayCarrito));


}
