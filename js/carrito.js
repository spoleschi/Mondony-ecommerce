function mostrarPedido(){

    let pedido = 'Pedido realizado: \n\n'
    //con foreach
    arrayPedido.forEach(el => pedido += el.listate());

    $cantCarrito.innerText = arrayPedido.length.toString();
    const $carrito = document.getElementById("carrito");
    const fila = document.createElement("tr");

    fila.innerHTML = `<tr>
                        <td>${proSelec.id}</td>
                        <td>${proSelec.nombre}</td>
                        <td>${$cant.value}</td>
                        <td>${proSelec.precio}</td>
                        <td>${proSelec.precio * $cant.value}</td>
                    </tr>`
    $carrito.appendChild(fila);
 }