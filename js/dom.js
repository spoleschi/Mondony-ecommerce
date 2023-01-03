//Defino e inicializo variables
let totalCompras = 0;
let arrayPedido = [];
let articuloSelec = -1;

//Clases

class Producto {
    constructor(id, tipoMueble, nombre, precio, imagen){
        this.id = id;
        this.tipoMueble = tipoMueble;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.stock = 0;
    }
}

class Pedido {
    constructor(idProducto, nomproducto, cantidad, precio){
        this.idProducto = idProducto;
        this.nomproducto = nomproducto;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}


function buscarIdx(valBus){
    let indice = -1
    arrayPedido.forEach((el,idx) => {
        if (el.idProducto == valBus) indice = idx;
    })
    return indice
}

// Genero instancias de la clase producto con los distintos modelos de producto

// const producto01 = new Producto(1,'Silla','Wishbone',24000,'./images/Sillas/Wishbone.jpg');
// const producto02 = new Producto(2,'Silla','Kennedy',29000,'./images/Sillas/Kennedy.jpg');
// const producto03 = new Producto(3,'Silla','Moller',23000,'./images/Sillas/Moller.jpg');
// const producto04 = new Producto(4,'Silla','Ch20',25000,'./images/Sillas/Ch20Elbow.jpg');
// const producto05 = new Producto(5,'Silla','Grace',39000,'./images/Sillas/Grace.jpg');
// const producto06 = new Producto(6,'Silla','Febo',28000,'./images/Sillas/Febo.jpg');

// Creo un array con los modelos de producto
//const productos = [producto01, producto02,producto03, producto04,producto05, producto06]


//cargo productos desde json

const BBDD = "json/productos.json";
const productos = [];

fetch(BBDD)
    .then((response) => response.json())
    .then((data) => {
        productos.push(...data);
        cargarProductos();
        //pintarBurgers(productos);
    })
    .catch(error => console.error(error))


// Cargo las productos a las cards de html


//Creando el evento en el innerHTML
// const cargarProductos2 = () => {
//     productos.forEach(producto => {
        
//         contenedor.innerHTML += 
//                         `<div class="card m-3" style="width: 18rem;">
//                             <img src= ${producto.imagen} class="card-img-top" alt=" ${producto.nombre}">
//                             <div class="card-body">
//                                 <h5 class="card-title"> ${producto.nombre}</h5>
//                                 <p class="card-text">Precio: ${producto.precio}</p>
//                                 <button onclick="agregarProducto(${producto.id})" class="buttonBig btn-colorDark-colorLight2"  data-toggle="modal" data-target="#agregaProd">Agreagar al carrito</button>
//                             </div>
//                         </div>`
//     })
// }

// function agregarProducto(id){
//     console.log(id);
//     articuloSelec = id;
// }


//Si concateno con innerHTML no funciona el botón, con appendChild si ¿?...
// const cargarProductosMal = () => {
//     productos.forEach(producto => {
        
//         contenedor.innerHTML += 
//                         `<div class="card m-3" style="width: 18rem;">
//                             <img src= ${producto.imagen} class="card-img-top" alt=" ${producto.nombre}">
//                             <div class="card-body">
//                                 <h5 class="card-title"> ${producto.nombre}</h5>
//                                 <p class="card-text">Precio: ${producto.precio}</p>
//                                 <a href="#" id = "boton${producto.id}" class="buttonBig btn-colorDark-colorLight2"  data-toggle="modal" data-target="#agregaProd">Agreagar al carrito</a>
//                             </div>
//                         </div>`
//         const boton = document.getElementById(`boton${producto.id}`);
//         boton.addEventListener("click", () => {
//             console.log(producto.id);
//             articuloSelec = producto.id;
//         })

//     })
// }


const cargarProductos = () => {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("contProd");
        //card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
        card.innerHTML = 
                        `<div class="card m-3" style="width: 20rem;">
                            <div class = "contImg">
                            <img src= ${producto.imagen} class="card-img-top" alt=" ${producto.nombre}">
                            </div>
                            <div class="card-body">
                                <h5 class="card-title"> ${producto.nombre}</h5>
                                <p class="card-text">Precio: ${new Intl.NumberFormat('es-AR', {style: 'currency',   currency: 'ARS',}).format(producto.precio)} </p>
                                <a href="#" id = "boton${producto.id}" class="buttonBig btn-colorDark-colorLight2"  data-toggle="modal" data-target="#agregaProd">Agreagar al carrito</a>
                            </div>
                        </div>`
        contenedor.appendChild(card);

        //Agregar productos al carrito: 

        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            //agregarAlCarrito(producto.id)
            console.log(producto.id);
            articuloSelec = producto.id;
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
const contenedor = document.getElementById("contenedor");
const $cant = document.getElementById("cant")
const $sumaCant = document.getElementById("sumaCant")
const $restaCant = document.getElementById("restaCant")
const $agregaArt = document.getElementById("agregaArt")
const $cantCarrito = document.getElementById("cantCarrito");
const $carrito = document.getElementById("carrito");
const $vaciar = document.querySelector('#vaciar');
const $comprar = document.querySelector('#comprar');
const $total = document.querySelector('#total');

const $btnSillas = document.querySelector('#btnSillas');
const $btnBancos = document.querySelector('#btnBancos');
const $btnSofas = document.querySelector('#btnSofas');

$sumaCant.addEventListener("click",() => $cant.value = parseInt($cant.value) + 1 )
$restaCant.addEventListener("click",() => parseInt($cant.value) > 1 ? $cant.value = parseInt($cant.value) - 1 : 1 )
$vaciar.addEventListener('click',limpiarCarrito);

// $comprar.addEventListener("click", () => {
//     new swal("Good job!", "You clicked the button!", "success")
// })

console.log($comprar.style);

console.log(getComputedStyle($comprar));
let a = getComputedStyle($comprar).getPropertyValue("backGroudColor");
let b = getComputedStyle($comprar).backgroundColor;
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
    limpiarCarrito();

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
    
    if (arrayPedido.length === 0)
    {
        $carrito.innerHTML = `<p><b> El carrito se encuentra vacío </b></p>`
                
        //Oculto modificando valor de propiedad dysplay:
        $vaciar.style.setProperty("display","none");
        //$comprar.style.setProperty("display","none");
        
        //Lo mismo pero con notación punto:
        //$comprar.style.display = "none";
        
        //Lo oculto agregando clase CSS
        $comprar.classList.add("oculta");

        // console.log(getComputedStyle($vaciar).display);
        // console.log($vaciar.style);
        // console.log($vaciar.getAttribute("style"));
    }
    else
    {   
        $vaciar.style.setProperty("display","inline-block");
        $comprar.classList.remove("oculta");

        $carrito.innerHTML = `<tr>
                                <th class="priority-4">Id</th>
                                <th>Desc.</th>
                                <th>Cant.</th>
                                <th class="priority-5">Precio</th>
                                <th>Total</th>
                                <th>Quitar</th>
                            </tr>`

        arrayPedido.forEach((el) => {

            //Desestructuración
            const {idProducto, nomproducto, cantidad, precio} = el;

            const fila = document.createElement("tr");

            fila.innerHTML =`<td class="priority-4" >${idProducto}</td>
                            <td>${nomproducto}</td>
                            <td>${cantidad}</td>
                            <td class="priority-5">${new Intl.NumberFormat().format(precio)}</td>
                            <td>${new Intl.NumberFormat().format(precio * cantidad)}</td>`
            // Boton de borrar
            const colBoton = document.createElement('td');
            colBoton.style.textAlign = 'center';
            const miBoton = document.createElement('button');
            miBoton.classList.add('btn', 'btn-outline-secondary');
            miBoton.textContent = 'X';
            //Utilizo un data-attribute...
            //miBoton.setAttribute("item",el.idProducto);
            miBoton.dataset.item = idProducto;
            miBoton.addEventListener('click', borrarItemCarrito);
            colBoton.appendChild(miBoton);
            fila.appendChild(colBoton);
            $carrito.appendChild(fila);

        })
        calcularTotal();
    }
}

function mostrarCarritoEnLi() {

    arrayPedido.forEach((item) => {

        const miNodo = document.createElement('li');
        miNodo.classList.add('list-group-item', 'text-right', 'mx-2');
        miNodo.textContent = `${item.cantidad} x ${item.nomproducto} - $ ${item.precio}`;
        // Boton de borrar
        const miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.dataset.item = item.idProducto;
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

    let proSelec = productos.find(el => el.id == articuloSelec);

    let idx = arrayPedido.findIndex(el => el.idProducto === proSelec.id);
                    
    if (idx > -1) {
        arrayPedido[idx].cantidad += Number($cant.value);
    }
    else{
        arrayPedido.push(new Pedido(proSelec.id,proSelec.nombre,Number($cant.value),proSelec.precio));
    }

    //totalCompras +=  proSelec.precio * Number($cant.value);    
    console.log(`Agregamos al carrito ${$cant.value} unidad/es de la producto: ${proSelec.nombre}`);
    console.log(arrayPedido);

    localStorage.setItem("carrito", JSON.stringify(arrayPedido));
    
    mostrarCarrito();
    //mostrarCarritoEnLi();
}

function borrarItemCarrito(evento) {
    // Obtengo el producto ID que hay en el boton pulsado
    const id = evento.target.dataset.item;

    // let pedSelec = arrayPedido.find(el => el.idProducto == id);
    // let indexSelec = arrayPedido.indexOf(pedSelec);
    // arrayPedido.splice(indexSelec, 1);

    //Lo hago más fácil con filter (ya que defino arrayPedido con let por uso de localStorage)...
    arrayPedido = arrayPedido.filter((el) => {
        return el.idProducto !== Number(id);
    });
    
    //totalCompras -=  pedSelec.precio * pedSelec.cantidad;
    
    //localStorage: 
    localStorage.setItem("carrito", JSON.stringify(arrayPedido));
    mostrarCarrito();   
    calcularTotal();
    //mostrarCarritoEnLi();
}

function calcularTotal()
{   
    totalCompras = 0;
    arrayPedido.forEach(element => {
        totalCompras += element.cantidad * element.precio;
    });
    $total.innerText = new Intl.NumberFormat('es-AR', {style: 'currency',   currency: 'ARS',}).format(totalCompras);
    
    $cantCarrito.innerText = arrayPedido.length.toString();
}

// Inicio

//Cargo carrito desde Local Storage
// if(localStorage.getItem("carrito")) {
//     arrayPedido = JSON.parse(localStorage.getItem("carrito"));
// }

//Utilizo operador OR
// arrayPedido = JSON.parse(localStorage.getItem("carrito")) || []


//Utilizo operador NULLISH
arrayPedido = JSON.parse(localStorage.getItem("carrito")) ?? []

calcularTotal();
// cargarProductos();
mostrarCarrito();


//Filtro

const $formulario = document.getElementById("formulario");

const filtrar = () =>{

    contenedor.innerHTML = '';
    
    const texto = $formulario.value.toLowerCase();
    for ( let producto of productos ){
        let nombre= producto.nombre.toLowerCase() + producto.tipoMueble.toLowerCase();

        if ( nombre.indexOf(texto) !== -1){
            //cargarProductos()
            const card = document.createElement("div");
            card.classList.add("contProd");
            //card.classList.add("col-xl-3", "col-md-6", "col-xs-12");
            card.innerHTML = 
                            `<div class="card m-3" style="width: 20rem;">
                                <div class = "contImg">
                                <img src= ${producto.imagen} class="card-img-top" alt=" ${producto.nombre}">
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title"> ${producto.nombre}</h5>
                                    <p class="card-text">Precio: ${new Intl.NumberFormat('es-AR', {style: 'currency',   currency: 'ARS',}).format(producto.precio)} </p>
                                    <a href="#" id = "boton${producto.id}" class="buttonBig btn-colorDark-colorLight2"  data-toggle="modal" data-target="#agregaProd">Agreagar al carrito</a>
                                </div>
                            </div>`
            contenedor.appendChild(card);

            //Agregar productos al carrito: 

            const boton = document.getElementById(`boton${producto.id}`);
            boton.addEventListener("click", () => {
                //agregarAlCarrito(producto.id)
                console.log(producto.id);
                articuloSelec = producto.id;
            })
                
        }

    }
    if ( contenedor.innerHTML === '' ){
        contenedor.innerHTML = `<li>Producto no encontrado</li>`
    }

}


$formulario.addEventListener('keyup', filtrar);

$btnSillas.addEventListener('click',() => {
    $formulario.value = "silla";
    filtrar();
    $formulario.value = "";
    } 
);

$btnBancos.addEventListener('click',() => {
    $formulario.value = "banco";
    filtrar();
    $formulario.value = "";
    } 
);

$btnSofas.addEventListener('click',() => {
    $formulario.value = "sofa";
    filtrar();
    $formulario.value = "";
    } 
);


