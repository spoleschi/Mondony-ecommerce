//Defino e inicializo variables
let totalCompras = 0;
const arrayPedido = [];

//Clases

class Producto {
    constructor(id, nombre, precio, imagen){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.imagen = imagen;
        this.stock = 0;
    }

    //función de clase (se genera una vez por prototipo)
    listate (){
        return `Código de silla: ${this.id} - Modelo: ${this.nombre} - Precio: $ ${this.precio} \n`;
    }
}

class Pedido {
    constructor(idSilla, nombreSilla, cantidad, precio){
        this.idSilla = idSilla;
        this.nombreSilla = nombreSilla;
        this.cantidad = cantidad;
        this.precio = precio;
    }
   
    listate (){
        return `Código de silla: ${this.idSilla} - Modelo: ${this.nombreSilla} - Cant.: ${this.cantidad} - Precio: $ ${this.precio} \n`;
    }
}

//Funciones

function darOpciones() {
    if (totalCompras == 0){
        return `1- Realizar una compra\n0- Finalizar`
    } 
    else{
        return `1- Agregar producto\n2- Eliminar producto\n0- Finalizar`
    }
}

//Alta productos
function altaProducto() {
    let nombre = prompt(`Ingrese el nombre del producto: `);
    let precio = parceFloat(prompt(`Ingrese el precio del producto `));
    let stock = parseInt(prompt(`Ingrese el stock inicial del producto `));

    
    // let arrayIds = []
    // for (const silla of sillas){
    //     arrayIds.push(silla.id)
    // }

    //Utilizando map
    const arrayIds = sillas.map((el) => el.id);
    
    //Obtengo el id máximo en mi array de sillas
    const idMax = arrayIds.reduce((max, el) => {if(el>max) { return el} else{ return max} }, 0);
    
    const silla = new Producto(idMax,nombre,precio,stock);
    sillas.push(silla);
    console.log(sillas);
    alert("El producto se ha agregado correctamente");
}

//Baja productos
function bajaProducto() {
    mostrarProductos();
    let id = parseInt(prompt("Ingrese el ID del producto a eliminar "));
    let silla = sillas.find(el => el.id == id);
    let i = sillas.indexOf(silla);
    sillas.splice(i, 1);
    console.log(sillas);
    alert("El producto se ha eliminado correctamente");
}

//Mostrar productos

//Función expresada - Arrow function
const mostrarProductos = () => {
    let productos = 'Listado de Productos:\n';
    //Con forof
    for (const silla of sillas){
        //productos = productos + `\n Código de silla : ${silla.id} - Modelo : ${silla.nombre} - Precio : ${silla.precio} `;
        productos = productos + silla.listate();
    }

    window.alert(productos);
}

//Función declarada, cual conviene usar?
function mostrarPedido(){

    let pedido = 'Pedido realizado: \n\n'
    //con foreach
    arrayPedido.forEach(el => pedido += el.listate());

    window.alert(pedido);
 }

//Funciones de valicación de entradas
//const validaProd = (producto) => isNaN(producto) == false && producto > 0 && producto < 7;
const validaProd = (idBus) => sillas.some(el => el.id == idBus);

const validaCant = cant => isNaN(cant) == false && cant > 0;


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

//Main

const resultado = document.getElementById("resultado");

// Cargo las sillas a las cards de html

for ( let silla of sillas ){
    resultado.innerHTML += `
    <div class="card m-3" style="width: 18rem;" id="resultado">
        <img src= ${silla.imagen} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title"> ${silla.nombre}</h5>
            <p class="card-text">Precio: ${silla.precio}</p>
            <a href="#" class="buttonBig btn-colorDark-colorLight2">Agreagar al carrito</a>
        </div>
    </div>
    `
}


window.onload = function() { // can also use window.addEventListener('load', (event) => {
    // alert('Page loaded');

    let opcion = Number(prompt(`Bienvenida/o al ecommerce de Mondony, muebles y diseño. \n \n Elija el nro. de opción que desea realizar \n \n` + darOpciones())); 
    
    while(opcion !== 0){
        if (opcion == 1){
            mostrarProductos();
            let idProd = Number(prompt('Ingrese el nro. de modelo de silla que quiere comprar'));
    
            let proSelec = sillas.find(el => el.id == idProd);
    
            if (proSelec !== undefined){
                
                let cant = Number(prompt('Ingresa la cantidad deseada'));
                if (validaCant(cant)) {
                    //Debería buscar si ya ingresaron esa silla e incrementar la cant...
                    
                    //let idx = buscarIdx(proSelec.id);
                    let idx = arrayPedido.findIndex(el => el.idSilla === proSelec.id);
                    
                    if (idx > -1) {
                        arrayPedido[idx].cantidad += cant;
                    }
                    else{
                        arrayPedido.push(new Pedido(proSelec.id,proSelec.nombre,cant,proSelec.precio));
                    }

                    totalCompras +=  proSelec.precio * cant;    
                    window.alert(`Agregamos al carrito ${cant} unidad/es de la silla: ${proSelec.nombre}`);
                }
                else window.alert('Debe ingresar la cantidad deseada en números');
            }
            else{
                window.alert('Debe ingresar un código de silla válido');
            }
        }
        else if(opcion == 2){
            mostrarPedido();
            let idPed = Number(prompt('Ingrese el código de silla que quiere eliminar'));
            let pedSelec = arrayPedido.find(el => el.idSilla == idPed);
            if (pedSelec !== undefined){
                totalCompras -= pedSelec.precio * pedSelec.cantidad;
                let indexSelec = arrayPedido.indexOf(pedSelec);
                arrayPedido.splice(indexSelec, 1);

                window.alert(`Se ha quitado el producto seleccionado del pedido`);
            }
            else{
                window.alert('Debe ingresar un código de silla existente en el pedido');
            }
        }
        else{
            window.alert('Debe ingresar una opción válida');
        }
        opcion = Number(prompt(`Elija el nro. de opción que desea realizar \n \n` + darOpciones())); 
    }


    // if (totalCompras>0){
    if (arrayPedido.length>0){
        mostrarPedido();
        window.alert(`El monto total de la compra es de $ ${totalCompras}`);
    }
}