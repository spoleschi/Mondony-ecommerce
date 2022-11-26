//Defino e inicializo variables
let totalCompras = 0;
const arrayPedido = [];


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

//Clases

class Producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
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


//Genero instancias de la clase producto con los distintos modelos de silla

const silla01 = new Producto(1,'wishbone',34000);
const silla02 = new Producto(2,'kennedy',29000);
const silla03 = new Producto(3,'moller',23000);
const silla04 = new Producto(4,'ch20',25000);
const silla05 = new Producto(5,'grace',39000);
const silla06 = new Producto(6,'febo',24000);

//Creo un array con los modelos de silla
const sillas = [silla01, silla02,silla03, silla04,silla05, silla06]

//Main

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

                    totalCompras +=  proSelec.precio * cant;
                    arrayPedido.push(new Pedido(proSelec.id,proSelec.nombre,cant,proSelec.precio));
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
        //window.alert(pedido);
        mostrarPedido();
        window.alert(`El monto total de la compra es de $ ${totalCompras}`);
    }



    // rta = window.confirm('¿Desea realizar una compra?');

    // //Ciclo para que el usuario ingrese los productos y cantidad deseada
    // while (rta == true){
    //     mostrarProductos();
    //     producto = Number(prompt('Ingrese el nro. de modelo de silla que quiere comprar'));
    //     let cant = Number(prompt('Ingresa la cantidad deseada'));

    //     // switch (producto){
    //     //     case 1:
    //     //         totalCompras += sillas[0].precio * cant;
    //     //         break;
    //     //     case 2:
    //     //         totalCompras += kennedy * cant;
    //     //         break;
    //     //     case 3:
    //     //         totalCompras += moller * cant;
    //     //         break;
    //     //     case 4:
    //     //         totalCompras += ch20 * cant;
    //     //         break;
    //     //     case 5:
    //     //         totalCompras += grace * cant;
    //     //         break;
    //     //     case 6:
    //     //         totalCompras += febo * cant;
    //     //         break;
    //     //     default:
    //     //         window.alert('Debe ingresar un modelo válido de silla(del 1 al 6)')
    //     // }

    // //Utilizo un if accediendo al precio por la posición en el array para no recorrer todas las opciones en un switch...

    

    // if (validaProd(producto)){
    //         if (validaCant(cant)) {
    //             totalCompras += sillas[Number(producto)-1].precio * cant;
    //             pedido = pedido + cant + ' ' +  sillas[Number(producto)-1].nombre + ' \n'
    //             window.alert(`Agregamos al carrito ${cant} unidad/es de la silla: ${sillas[Number(producto)-1].nombre}`);
    //         }
    //         else{
    //             window.alert('Debe ingresar la cantidad deseada en números');
    //         }
    //     }
    //     else{
    //         window.alert('Debe ingresar un código de silla válido(del 1 al 6)');
    //     }

    //     rta = window.confirm('¿Desea seleccionar otro pruducto?');
    // }

    // //Si se ha realizado la compra informo el pedido y el total de la operación
    // if (totalCompras){
    //     window.alert(pedido);
    //     window.alert(`El monto total de la compra es de $ ${totalCompras}`);
    // }

}