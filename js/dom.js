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

const silla01 = new Producto(1,'Wishbone',34000,'./images/Sillas/Wishbone.jpg');
const silla02 = new Producto(2,'Kennedy',29000,'./images/Sillas/Kennedy.jpg');
const silla03 = new Producto(3,'Moller',23000,'./images/Sillas/Moller.jpg');
const silla04 = new Producto(4,'Ch20',25000,'./images/Sillas/Ch20Elbow.jpg');
const silla05 = new Producto(5,'Grace',39000,'./images/Sillas/Grace.jpg');
const silla06 = new Producto(6,'Febo',24000,'./images/Sillas/Febo.jpg');

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

const limpiarCarrito = () => {
    arrayPedido = [];
    mostrarCarrito();
    calcularTotal();

    //localStorage: 
    localStorage.clear();
}


//Variables del DOM
const $cant = document.getElementById("cant")
const $sumaCant = document.getElementById("sumaCant")
const $restaCant = document.getElementById("restaCant")
const $agregaArt = document.getElementById("agregaArt")
const $cantCarrito = document.getElementById("cantCarrito");
const $carrito = document.getElementById("carrito");
const $vaciar = document.querySelector('#vaciar');
const $comprar = document.querySelector('#comprar');
const $total = document.querySelector('#total');


$sumaCant.addEventListener("click",() => $cant.value = parseInt($cant.value) + 1 )
$restaCant.addEventListener("click",() => parseInt($cant.value) > 1 ? $cant.value = parseInt($cant.value) - 1 : 1 )
$vaciar.addEventListener('click',limpiarCarrito);

// $comprar.addEventListener("click", () => {
//     new swal("Good job!", "You clicked the button!", "success")
// })

console.log($comprar.style);

console.log(window.getComputedStyle($comprar));
let a = window.getComputedStyle($comprar).backgroundColor;
console.log(a);

$comprar.addEventListener("click", () => {
    Swal.fire({
        title: "Compra realizada!",
        text: "Gracias por elegir Mondony Muebles, Arte y Diseño",
        icon: "success",
        iconColor: "gray",
        confirmButtonText: "Aceptar",
        customClass:{confirmButton: 'buttonBig btn-colorLight-colorDarkv'}

    })
})

$agregaArt.onclick = () => {
    
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

const mostrarCarrito = () => {
    
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

        fila.innerHTML =`<td class="priority-4" >${el.idSilla}</td>
                        <td>${el.nombreSilla}</td>
                        <td>${el.cantidad}</td>
                        <td class="priority-5">${new Intl.NumberFormat().format(el.precio)}</td>
                        <td>${new Intl.NumberFormat().format(el.precio * el.cantidad)}</td>`
        // Boton de borrar
        const colBoton = document.createElement('td');
        colBoton.style.textAlign = 'center';
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-outline-secondary');
        miBoton.textContent = 'X';
        //Utilizo un data-attribute...
        //miBoton.setAttribute("item",el.idSilla);
        miBoton.dataset.item = el.idSilla;
        miBoton.addEventListener('click', borrarItemCarrito);
        colBoton.appendChild(miBoton);
        fila.appendChild(colBoton);
        $carrito.appendChild(fila);

    })
    calcularTotal();
}

function mostrarCarritoEnLi() {

    arrayPedido.forEach((item) => {

        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${item.cantidad} x ${item.nombreSilla} - $ ${item.precio}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item.idSilla;
        miBoton.addEventListener('click', borrarItemCarrito);
        // Mezclamos nodos
        miNodo.appendChild(miBoton);
        $carrito.appendChild(miNodo);
    });
    calcularTotal();
   // Renderizamos el precio total en el HTML
   //DOMtotal.textContent = calcularTotal();
}

let agregarProd = () => {

    let proSelec = sillas.find(el => el.id == articuloSelec);

    let idx = arrayPedido.findIndex(el => el.idSilla === proSelec.id);
                    
    if (idx > -1) {
        arrayPedido[idx].cantidad += Number($cant.value);
    }
    else{
        arrayPedido.push(new Pedido(proSelec.id,proSelec.nombre,Number($cant.value),proSelec.precio));
    }

    //totalCompras +=  proSelec.precio * Number($cant.value);    
    console.log(`Agregamos al carrito ${$cant.value} unidad/es de la silla: ${proSelec.nombre}`);
    console.log(arrayPedido);

    localStorage.setItem("carrito", JSON.stringify(arrayPedido));
    
    mostrarCarrito();
    //mostrarCarritoEnLi();
}

function borrarItemCarrito(evento) {
    // Obtengo el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;

    // let pedSelec = arrayPedido.find(el => el.idSilla == id);
    // let indexSelec = arrayPedido.indexOf(pedSelec);
    // arrayPedido.splice(indexSelec, 1);

    //Lo hago más fácil con filter (ya que defino arrayPedido con let por uso de localStorage)...
    arrayPedido = arrayPedido.filter((el) => {
        return el.idSilla !== Number(id);
    });
    
    //totalCompras -=  pedSelec.precio * pedSelec.cantidad;
    
    //localStorage: 
    localStorage.setItem("carrito", JSON.stringify(arrayPedido));
      
    mostrarCarrito();   
    //mostrarCarritoEnLi();
}

function calcularTotal()
{   
    totalCompras = 0;
    arrayPedido.forEach(element => {
        totalCompras += element.cantidad * element.precio;
    });
    $total.innerText = new Intl.NumberFormat('en-US', {style: 'currency',   currency: 'USD',}).format(totalCompras);
    
    $cantCarrito.innerText = arrayPedido.length.toString();
}

// Inicio
if(localStorage.getItem("carrito")) {
    arrayPedido = JSON.parse(localStorage.getItem("carrito"));
}
calcularTotal();
cargarProductos();
mostrarCarrito();