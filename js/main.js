//Defino e inicializo variables
let rta, producto, totalcompras, pedido;
rta = true;
totalcompras = 0;
pedido = 'Pedido realizado:  \n \n'

//Creo la clase productos para almacenar los distintos modelos de sillas
class Producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }

    //función de clase (se genera una vez por prototipo)
    listate (){
        return `Código de silla : ${this.id} - Modelo : ${this.nombre} - Precio : $ ${this.precio} \n`;
    }
}

//Genero instancias de la clase producto con los distintos modelos de silla

const silla01 = new Producto(1,'wishbone',34000)
const silla02 = new Producto(2,'kennedy',29000)
const silla03 = new Producto(3,'moller',23000)
const silla04 = new Producto(4,'ch20',25000)
const silla05 = new Producto(5,'grace',39000)
const silla06 = new Producto(6,'febo',24000)

//Creo un array con los modelos de silla
const sillas = [silla01, silla02,silla03, silla04,silla05, silla06]

//Creo una función que muestra las opciones al usuario
function mostrarProductos(){
    let productos = 'Listado de Productos: \n';
    
    //Utilizando forEach
    // sillas.forEach(function(element) {
    //      productos = productos + `\n Código de silla : ${element.id} - Modelo : ${element.nombre} - Precio : ${element.precio} `;
    // });

    //Utilizando for of
    for (const silla of sillas){
        //productos = productos + `\n Código de silla : ${silla.id} - Modelo : ${silla.nombre} - Precio : ${silla.precio} `;
        productos = productos + ' ' + silla.listate();
    }

    window.alert(productos);
}

//Inicio de programa

rta = window.confirm('¿Desea realizar una compra?');

//Ciclo para que el usuario ingrese los productos y cantidad deseada
while (rta == true){
    mostrarProductos();
    producto = Number(prompt('Ingrese el nro. de modelo de silla que quiere comprar'));
    let cant = Number(prompt('Ingresa la cantidad deseada'));

    // switch (producto){
    //     case 1:
    //         totalcompras += sillas[0].precio * cant;
    //         break;
    //     case 2:
    //         totalcompras += kennedy * cant;
    //         break;
    //     case 3:
    //         totalcompras += moller * cant;
    //         break;
    //     case 4:
    //         totalcompras += ch20 * cant;
    //         break;
    //     case 5:
    //         totalcompras += grace * cant;
    //         break;
    //     case 6:
    //         totalcompras += febo * cant;
    //         break;
    //     default:
    //         window.alert('Debe ingresar un modelo válido de silla(del 1 al 6)')
    // }

//Utilizo un if accediendo al precio por la posición en el array para no recorrer todas las opciones en un switch...
    
if (isNaN(producto) == false && producto > 0 && producto < 7){
        if (isNaN(cant) == false && cant > 0) {
            totalcompras += sillas[Number(producto)-1].precio * cant;
            pedido = pedido + cant + ' ' +  sillas[Number(producto)-1].nombre + ' \n'
            window.alert(`Agregamos al carrito ${cant} unidad/es de la silla: ${sillas[Number(producto)-1].nombre}`);
        }
        else{
            window.alert('Debe ingresar la cantidad deseada en números');
        }
    }
    else{
        window.alert('Debe ingresar un código de silla válido(del 1 al 6)');
    }

    rta = window.confirm('¿Desea seleccionar otro pruducto?');
}

//Si se ha realizado la compra informo el pedido y el total de la operación
if (totalcompras){
    window.alert(pedido);
    window.alert(`El monto total de la compra es de $ ${totalcompras}`);
}

