//Defino e inicializo variables
let totalCompras = 0;
let arrayPedido = [];
let articuloSelec = -1;

//Clases

class Producto {
    constructor(id, nombre, precio, imagen){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.stock = 0;
    }
}

class Pedido {
    constructor(idSilla, nombreSilla, cantidad, precio){
        this.idSilla = idSilla;
        this.nombreSilla = nombreSilla;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}


function buscarIdx(valBus){
    let indice = -1
    arrayPedido.forEach((el,idx) => {
        if (el.idSilla == valBus) indice = idx;
    })
    return indice
}

//Genero instancias de la clase producto con los distintos modelos de silla

const silla01 = new Producto(1,'Wishbone',34000,'./images/Sillas/wishbone.jpg');
const silla02 = new Producto(2,'Kennedy',29000,'./images/Sillas/kennedy.jpg');
const silla03 = new Producto(3,'Moller',23000,'./images/Sillas/moller.jpg');
const silla04 = new Producto(4,'Ch20',25000,'./images/Sillas/Ch20Elbow.jpg');
const silla05 = new Producto(5,'Grace',39000,'./images/Sillas/grace.jpg');
const silla06 = new Producto(6,'Febo',24000,'./images/Sillas/febo.jpg');

//Creo un array con los modelos de silla
const sillas = [silla01, silla02,silla03, silla04,silla05, silla06]

// Cargo las sillas a las cards de html

//Si concateno con innerHTML no funciona el botón ¿?...

const contenedor = document.getElementById("contenedor");

const cargarProductosMal = () => {
    sillas.forEach(silla  => {
        
        contenedor.innerHTML += 
                        `<div class="card m-3" style="width: 18rem;">
                            <img src= ${silla.imagen} class="card-img-top" alt=" ${silla.nombre}">
                            <div class="card-body">
                                <h5 class="card-title"> ${silla.nombre}</h5>
                                <p class="card-text">Precio: ${silla.precio}</p>
                                <a href="#" id = "boton${silla.id}" class="buttonBig btn-colorDark-colorLight2"  data-toggle="modal" data-target="#agregaProd">Agreagar al carrito</a>
                            </div>
                        </div>`
        const boton = document.getElementById(`boton${silla.id}`);
        boton.addEventListener("click", () => {
            console.log(silla.id);
            articuloSelec = silla.id;
        })

    })
}

const cargarProductos = () => {
    sillas.forEach(silla  => {
        const card = document.createElement("div");
        //card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = 
                        `<div class="card m-3" style="width: 18rem;">
                            <img src= ${silla.imagen} class="card-img-top" alt=" ${silla.nombre}">
                            <div class="card-body">
                                <h5 class="card-title"> ${silla.nombre}</h5>
                                <p class="card-text">Precio: ${silla.precio}</p>
                                <a href="#" id = "boton${silla.id}" class="buttonBig btn-colorDark-colorLight2"  data-toggle="modal" data-target="#agregaProd">Agreagar al carrito</a>
                            </div>
                        </div>`
        contenedor.appendChild(card);

        //Agregar productos al carrito: 

        const boton = document.getElementById(`boton${silla.id}`);
        boton.addEventListener("click", () => {
            //agregarAlCarrito(producto.id)
            console.log(silla.id);
            articuloSelec = silla.id;
        })
    })
}

cargarProductos();

//const $cant = document.querySelector("#cant")
const $cant = document.getElementById("cant")
const $sumaCant = document.getElementById("sumaCant")
const $restaCant = document.getElementById("restaCant")
const $agregaArt = document.getElementById("agregaArt")
const $cantCarrito = document.getElementById("cantCarrito");
const DOMcarrito = document.querySelector('#carrito');

$sumaCant.addEventListener("click",() => $cant.value = parseInt($cant.value) + 1 )
$restaCant.addEventListener("click",() => parseInt($cant.value) > 1 ? $cant.value = parseInt($cant.value) - 1 : 1 )

$agregaArt.onclick = () => {
    let $cant = document.getElementById("cant");
    console.log(articuloSelec, $cant, $cant.value);
    agregarProd();

    Toastify({
        text: "Producto agregado",
        duration: 1000,
        style:
        {
            background: "linear-gradient(to right, #000000, #cccccc)",
        }
    }).showToast();
    $cant.value = "1";
};



let agregarProd = () => {

    let proSelec = sillas.find(el => el.id == articuloSelec);

    let idx = arrayPedido.findIndex(el => el.idSilla === proSelec.id);
                    
    if (idx > -1) {
        arrayPedido[idx].cantidad += Number($cant.value);
    }
    else{
        arrayPedido.push(new Pedido(proSelec.id,proSelec.nombre,Number($cant.value),proSelec.precio));
    }

    totalCompras +=  proSelec.precio * $cant;    
    console.log(`Agregamos al carrito ${$cant.value} unidad/es de la silla: ${proSelec.nombre}`);
    console.log(arrayPedido);

    $cantCarrito.innerText = arrayPedido.length.toString();
    mostrarCarrito();
    renderizarCarrito();

}

const mostrarCarrito = () => {
    
    const $carrito = document.getElementById("carrito");
    $carrito.innerHTML = `<tr>
                            <th class="priority-4">Id</th>
                            <th>Desc.</th>
                            <th>Cant.</th>
                            <th class="priority-5">Precio</th>
                            <th>Total</th>
                            <th>Quitar</th>
                        </tr>`

    arrayPedido.forEach((el) => {
        const fila = document.createElement("tr");

        fila.innerHTML =`<td class="priority-4">${el.idSilla}</td>
                        <td>${el.nombreSilla}</td>
                        <td>${el.cantidad}</td>
                        <td class="priority-5">${el.precio}</td>
                        <td>${el.precio * el.cantidad}</td>`
        // Boton de borrar
        const colBoton = document.createElement('td');
        colBoton.style.textAlign = 'center';
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-outline-secondary');
        miBoton.textContent = 'X';
        miBoton.dataset.item = el.idSilla;
        miBoton.addEventListener('click', borrarItemCarrito);
        colBoton.appendChild(miBoton);
        fila.appendChild(colBoton);
        $carrito.appendChild(fila);
    })
}

function renderizarCarrito() {

    arrayPedido.forEach((item) => {

        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${item.cantidad} x ${item.nombreSilla} - ${item.precio} '$'`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item.idSilla;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        DOMcarrito.appendChild(miNodo);
    });
   // Renderizamos el precio total en el HTML
   //DOMtotal.textContent = calcularTotal();
}


function borrarItemCarrito(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    // Borramos todos los productos
    arrayPedido = arrayPedido.filter((el) => {
        return el.idSilla !== Number(id);
    });
    // volvemos a renderizar
    $cantCarrito.innerText = arrayPedido.length.toString();
    mostrarCarrito();
    renderizarCarrito();
}

function borrarItemCarrito2(evento) {
    // Obtenemos el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;
    console.log(id);
}

