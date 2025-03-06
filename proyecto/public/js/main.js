// puede que este fichero no sea necesario
// Incluye : todas las funciones y otros recursos a usar utilizando import/export

import JuegoDeMesa from "./JuegoDeMesa.js";
import {carrito, listaProductos, obtenerCampoAdicional, crearProducto} from "./tienda.js";

const productosContainer = document.getElementById("contenedorProductos");

// Paginacion
let productosPorPagina;
let paginaActual;
let productosFiltrados = listaProductos; // Inicializamos con todos los productos


document.addEventListener("DOMContentLoaded", function () {
    // Evento para el buscador de productos
    const searchBar = document.getElementById("search-bar");
    const titulo = document.getElementById("titulo");
    searchBar.addEventListener("input", function () {
        const searchText = searchBar.value.trim();
        // Cambiar el titulo del main segun el texto del buscador
        if (searchText.length > 0) {
            titulo.textContent = `Buscando por: ${searchText}`;
        } else {
            titulo.textContent = "Todos los productos";
        }
        buscarProductos(searchText);
    });
    // Evento para cargar productos en la página
    paginaActual = 1; // Asegurar que la paginación comience desde la primera página
    productosPorPagina = 6; // Mostrar solo 6 productos por página
    productosFiltrados = listaProductos.slice(); // Copiar la lista completa
    mostrarProductos(obtenerProductosPorPagina());
});

// Funcion para mostrar productos en la web
function mostrarProductos(productos) {
    productosContainer.innerHTML = ""; // Vacia el contenedor de productos
    productos.forEach(producto => { // Iteramos por cada producto de la lista de productos
        const article = document.createElement("article"); // Crea un <article> por cada producto
        article.classList.add("col-md-4", "mb-4"); // Añadimos clases de Bootstrap
         // Dependiendo del tipo de producto, mostrar su información adicional
         let extraInfo = "";
         extraInfo = obtenerCampoAdicional(producto)
        // Creamos una tarjeta card de Bootstrap para mostrar la info de cada producto
        article.innerHTML = ` 
            <div class="card">
                <div class="boton-carrito">
                    <button class="btn btn-primary">
                        <img src="imagenes/carrito.svg" alt="Carrito">       
                    </button>
                    <div class="mensaje-añadido">¡Añadido!</div>
                    <div class="mensaje-rechazado">¡Rechazado!</div>
                </div>
                <img src="${producto.imagen}" class="card-img-top" alt="${producto.nombre}" data-id="${producto.id}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="text-muted">${producto.precio}€</p>
                    <p class="card-text">${producto.descripcion}</p>
                    ${extraInfo}
                </div>
            </div>
        `;
        productosContainer.appendChild(article); // Añadimos la tarjeta <article> creado al contenedor de productos
         // Agregar evento para que al hacer clic en la imagen de un producto se muestre su info detallada
         const imgProducto = article.querySelector(".card-img-top");
         imgProducto.addEventListener("click", (event) => {
             const productoId = event.target.dataset.id;
             mostrarDetallesProducto(productoId);
         });

        // Agregar evento para mostrar el mensaje de éxito/rechazo de añadir producto al carrito
        const botonCarrito = article.querySelector(".boton-carrito button");
        const mensajeAñadido = article.querySelector(".mensaje-añadido");
        const mensajeRechazado = article.querySelector(".mensaje-rechazado");
        // Si se clica en el boton de añadir al carrito
        botonCarrito.addEventListener("click", function () {
            const productoId = producto.id; // Obtener el ID del producto
            const productoEnCarrito = carrito.find(item => Object.keys(item)[0] === productoId); // Verificar si el producto ya está en el carrito
            if (productoEnCarrito) { // Si el producto ya está en el carrito, incrementar la cantidad
                if (productoEnCarrito[productoId].cantidad==20){
                    // Mostrar mensaje de Rechazado por 2s si se clica en el boton del carrito teniendo ya 20 copias
                    mostrarMensaje(mensajeRechazado)
                    console.log("ERROR : No se puede añadir, ya hay 20 copias");
                } else {
                productoEnCarrito[productoId].cantidad += 1;
                // Mostrar mensaje de Añadido por 2s si se clica en el boton del carrito
                mostrarMensaje(mensajeAñadido)
                }
            } else { // Si el producto no está en el carrito, agregarlo con cantidad 1
                carrito.push({
                    [producto.id]: {  // Usar directamente la ID como clave
                        id: producto.id,
                        nombre: producto.nombre,
                        precio: producto.precio,
                        imagen: producto.imagen,
                        categoria: producto.categoria,  // Asegurarnos de que la categoría se guarde
                        cantidad: 1  // Inicializar cantidad como 1
                    }
                });
                // Mostrar mensaje de Añadido por 2s si se clica en el boton del carrito
                mostrarMensaje(mensajeAñadido)
            }
            // Actualizar el carrito visualmente
            actualizarCarrito(carrito);
            });     
    });
    renderizarPaginacion();  // Actualizar paginacion
    const detallePaginacion = document.getElementById("detallePaginacion");
    detallePaginacion.textContent = `Mostrando ${productos.length} productos de ${productosFiltrados.length}`;
}

// Función para obtener los productos que deben mostrarse en la página actual
function obtenerProductosPorPagina() {
    const inicio = (paginaActual - 1) * productosPorPagina;
    const fin = inicio + productosPorPagina;
    return productosFiltrados.slice(inicio, fin);
}

// Funcion para actualizar los botones de la paginacion
function renderizarPaginacion() {
    const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina); // Calculamos el total de paginas necesarias
    const paginacionContainer = document.getElementById("paginacion");
    paginacionContainer.innerHTML = ""; // Limpiamos el contenedor de la paginacion
    // Si no es la primera pagina mostrar el boton "Anterior"
    if (paginaActual > 1) {
        const anterior = document.createElement("button");
        anterior.textContent = "Anterior";
        anterior.addEventListener("click", () => {
            paginaActual--;
            mostrarProductos(obtenerProductosPorPagina());
        });
        paginacionContainer.appendChild(anterior);
    }
    // Si la pagina es la actual, añadir la clase pagActual
    for (let i = 1; i <= totalPaginas; i++) {
        const pagina = document.createElement("button");
        pagina.textContent = i;
        pagina.classList.toggle("pagActual", i === paginaActual);
        pagina.addEventListener("click", () => {
            paginaActual = i;
            mostrarProductos(obtenerProductosPorPagina());
        });
        paginacionContainer.appendChild(pagina);
    }
    // Si hay mas paginas mostrar el boton "Siguiente"
    if (paginaActual < totalPaginas) {
        const siguiente = document.createElement("button");
        siguiente.textContent = "Siguiente";
        siguiente.addEventListener("click", () => {
            paginaActual++;
            mostrarProductos(obtenerProductosPorPagina());
        });
        paginacionContainer.appendChild(siguiente);
    }
}

// Funcion para mostrar un mensaje sobre el logo del carrito del producto
function mostrarMensaje(mensaje) {
    mensaje.style.display = "block";
    setTimeout(() => {
        mensaje.style.display = "none";
    }, 2000);
}

// Funcion para actualizar los productos del carrito
function actualizarCarrito(carrito) {
    const carritoContainer = document.getElementById("contenedorProductosCarrito");
    carritoContainer.innerHTML = ""; // Limpiar el contenedor antes de actualizar
    const precioTotalP = document.getElementById("precioTotal");
    const carritoBtn = document.getElementById("mostrarBotonCarrito");

    if (carrito.length === 0) {
        carritoContainer.innerHTML = "<p class='text-muted'>El carrito está vacío</p>";
        precioTotalP.textContent = `0`;
        carritoBtn.style.display = "none";
        return;
    }

    carritoBtn.style.display = "block";
    let precioTotal = 0;
    let totalJuegosDeMesa = 0;
    let descuentoAplicado = false;
    let idDescuento = "descuento-promocion";
    let idCodigoDescuento = "descuento-codigo";
    
    // Calcular el total de juegos de mesa
    carrito.forEach(producto => {
        const productoId = Object.keys(producto)[0];
        const detallesProducto = producto[productoId];

        // Verificar si el producto es un juego de mesa y acumular su precio
        if (detallesProducto.categoria === "juego de mesa") {
            totalJuegosDeMesa += detallesProducto.precio * detallesProducto.cantidad;
        }

        precioTotal += detallesProducto.precio * detallesProducto.cantidad;
    });

    // Aplicar descuento si los juegos de mesa superan los 30€
    let descuento = 0;
    if (totalJuegosDeMesa > 30 && !descuentoAplicado) {
        descuento = totalJuegosDeMesa * 0.15;
        precioTotal -= descuento;
        descuentoAplicado = true;

        // Verificar si el descuento ya existe en el carrito
        const indiceDescuento = carrito.findIndex(item => Object.keys(item)[0] === idDescuento);
        
        if (indiceDescuento !== -1) {
            // Si ya existe un descuento, actualizar su valor
            carrito[indiceDescuento][idDescuento].precio = -descuento.toFixed(2);
            console.log("Descuento actualizado en el carrito:", descuento);
        } else {
            // Si no existe un descuento, agregar uno nuevo
            carrito.push({
                [idDescuento]: {
                    nombre: "Descuento Promoción",
                    precio: -descuento.toFixed(2),
                    cantidad: 1,
                    imagen: "imagenes/descuento.jpg"
                }
            });
            console.log("Descuento añadido al carrito:", descuento);
        } 


    } else if (totalJuegosDeMesa <= 30) {
        // Si el total de juegos de mesa es menor o igual a 30€, eliminar el descuento
        const indiceDescuento = carrito.findIndex(item => Object.keys(item)[0] === idDescuento);
        if (indiceDescuento !== -1) {
            carrito.splice(indiceDescuento, 1); // Eliminar el descuento
            console.log("Descuento eliminado del carrito, total no supera los 30€");
        }
    }

    // verificar y actualizar el descuento por código si está `presente en el carrito
    //const indiceCodigoDescuento = carrito.findIndex(item => Object.keys(item)[0] === idCodigoDescuento);
    //if (indiceCodigoDescuento !== -1) {
        //let precioTotalSinDescuentos = calcularTotalSinDescuentos(carrito); // Calcula el total sin contar descuentos
        //let descuentoCodigo = precioTotalSinDescuentos * 0.05; // Descuento del 5%
        //carrito[indiceCodigoDescuento][idCodigoDescuento].precio = -descuentoCodigo.toFixed(2);
        //precioTotal -= descuentoCodigo; // Restar el descuento
    //}

    // Actualizar el precio total
    precioTotalP.textContent = `${precioTotal.toFixed(2)}`;

    // Crear el carrito visualmente
    carrito.forEach(producto => {
        const productoId = Object.keys(producto)[0];
        const detallesProducto = producto[productoId];

        const divProducto = document.createElement("div");
        divProducto.classList.add("productosCarritoDesplegable");
        if (productoId === idDescuento || productoId === idCodigoDescuento) {
            divProducto.innerHTML = `
                <div class="row">
                    <div class="col-12 mb-3 d-flex align-items-center">
                        <img src="${detallesProducto.imagen}" alt="${detallesProducto.nombre}" class="me-3" width="50">
                        <div class="flex-grow-1">
                            <h6 class="mb-0">${detallesProducto.nombre}</h6>
                            <div class="precioXcantidad d-flex align-items-center">
                                <p>${detallesProducto.precio}€</p>  <!-- Mostrar solo el precio sin cantidad -->
                            </div>
                        </div>
                    </div>
                </div>`;
        } else {
            // Para el resto de productos (no descuentos), mostrar la cantidad y el botón eliminar
            divProducto.innerHTML = `
                <div class="row">
                    <div class="col-12 mb-3 d-flex align-items-center">
                        <img src="${detallesProducto.imagen}" alt="${detallesProducto.nombre}" class="me-3" width="50" data-id="${productoId}">
                        <div class="flex-grow-1">
                            <h6 class="mb-0">${detallesProducto.nombre}</h6>
                            <div class="precioXcantidad d-flex align-items-center">
                                <p>${detallesProducto.precio}€ x</p>
                                <input type="number" class="cantidad-carrito" data-id="${productoId}" value="${detallesProducto.cantidad}">
                                <p class="precio-total-producto"> = ${(detallesProducto.precio * detallesProducto.cantidad).toFixed(2)}€</p>
                            </div>
                        </div>
                        <button class="btn btn-sm btn-danger eliminar-producto" data-id="${productoId}">X</button>
                    </div>
                </div>`;
        }
        carritoContainer.appendChild(divProducto);
    });

    // Evento para actualizar cantidad y precio en tiempo real
    document.querySelectorAll(".cantidad-carrito").forEach(input => {
        input.addEventListener("input", function () {
            const productoId = this.dataset.id;
            let nuevaCantidad = parseInt(this.value);
            if (nuevaCantidad === 0) {
                borrarProductoCarrito(productoId);
                return;
            }
            const productoEnCarrito = carrito.find(item => Object.keys(item)[0] == productoId);
            if (productoEnCarrito) {
                productoEnCarrito[productoId].cantidad = nuevaCantidad;
                actualizarCarrito(carrito);
            }
        });
    });

    // Evento para eliminar productos del carrito
    document.querySelectorAll(".eliminar-producto").forEach(btn => {
        btn.addEventListener("click", function () {
            const productoId = this.dataset.id;
            const divProducto = this.closest('.productosCarritoDesplegable');
            borrarProductoCarrito(productoId, divProducto);
        });
    });
}



function borrarProductoCarrito(productoId, divProducto){
    const index = carrito.findIndex(item => Object.keys(item)[0] === productoId); // Buscar producto en el carrito
    if (index !== -1) {
        carrito.splice(index, 1);  // Eliminar el producto del carrito
    }
    // Eliminar el contenedor visual del producto
    divProducto.remove();
    // Actualizar el carrito después de la eliminación
    actualizarCarrito(carrito);
}
//////////////////////////////////////////////////EVENTOS//////////////////////////////////////////////////////////////////////////////

// Mostrar campo adicional en el formulario de añadir productos
document.getElementById('tipoProducto').addEventListener('change', function () {
    const tipo = this.value;
    const campoAdicional = document.getElementById('campo-adicional');
    // Limpiar el contenido previo
    campoAdicional.innerHTML = '';
    // Mostrar el campo correspondiente según el tipo
    if (tipo === 'T1') {
        campoAdicional.innerHTML = `<input type="text" name="Compañia" id="campoExtra" placeholder="Compañia">`;
    } else if (tipo === 'T2') {
        campoAdicional.innerHTML = `<input type="text" name="Editorial" id="campoExtra" placeholder="Editorial">`;
    } else if (tipo === 'T3') {
        campoAdicional.innerHTML = `<input type="text" name="Fabricante" id="campoExtra" placeholder="Fabricante">`;
    } else if (tipo === 'T4') {
        campoAdicional.innerHTML = `<input type="number" name="numPiezas" id="campoExtra" placeholder="Número de Piezas">`;
    } else if (tipo === 'T5') {
        campoAdicional.innerHTML = `<input type="number" name="numJugadores" id="campoExtra" placeholder="Número de Jugadores">`;
    }
});

// Borrar el campo adicional y imagen del formulario de añadir producto cuando se pulse en borrar
document.querySelector('form').addEventListener('reset', function () {
    const campoAdicional = document.getElementById('campo-adicional');
    campoAdicional.innerHTML = ''; // Limpiar el campo adicional
    
     const inputFile = document.getElementById("seleccionArchivo");
     if (inputFile) {
         inputFile.value = ""; // Restablecer el valor del input file
         fileNameDisplay.textContent = "No hay imagen"; // Cambiar texto del input
     }
});

// Prevenir el envío del formulario si falta algun campo    
document.getElementById("btnSubirProducto").addEventListener("click", function(event) {
    event.preventDefault(); // Prevenir el envio del formulario
    // Obtener los valores de los campos
    const tipoProducto = document.getElementById("tipoProducto").value;
    const nombre = document.getElementById("nombre").value;
    const precio = document.getElementById("precio").value;
    const descripcion = document.querySelector("textarea[name='descripcion']").value;
    const campoExtra = document.getElementById("campoExtra")?.value;
    const imagenBuscar = document.getElementById("seleccionArchivo");
    const imagenDragDrop = document.getElementById("arrastrarArchivo");
    mensajeErrorProdNuevo.textContent = "" // Limpiar cualquier mensaje de error anterior
    let imagenUrl = "imagenes/ProductoSinImagen.png"; // Poner imagen por defecto
    // Verificar si algún campo está vacío para mostrar mensaje de error si corresponde
    if (!tipoProducto) {
        mensajeErrorProdNuevo.textContent = "Por favor, introduzca el tipo del producto.";
        mostrarMensaje(mensajeErrorProdNuevo)
    } else if (!nombre) {
        mensajeErrorProdNuevo.textContent = "Por favor, introduzca el nombre del producto.";
        mostrarMensaje(mensajeErrorProdNuevo)
    } else if (!precio ){
        mensajeErrorProdNuevo.textContent = "Por favor, introduzca el precio del producto.";
        mostrarMensaje(mensajeErrorProdNuevo)
    } else if (!campoExtra ){
        mensajeErrorProdNuevo.textContent = "Por favor, introduzca el campo extra del producto.";
        mostrarMensaje(mensajeErrorProdNuevo)
    }  else { 
        if (imagenBuscar.files && imagenBuscar.files[0]) {// Verificar si el usuario seleccionó una imagen 
            let archivoImagen = imagenBuscar.files[0];
            imagenUrl = URL.createObjectURL(archivoImagen);
        }
        // Crear el nuevo producto basándonos en el tipo seleccionado
        let nuevoProducto = crearProducto(tipoProducto, nombre, precio, descripcion, imagenUrl, campoExtra);
        // Añadir el nuevo producto a la lista de productos
        listaProductos.push(nuevoProducto);
        // Limpiar los datos del formulario
        document.querySelector("form").reset();
        // Mostrar un mensaje de éxito
        mostrarMensaje(mensajeProdNuevo)
        // Volver a mostrar los productos, incluyendo el nuevo
        productosFiltrados = listaProductos.slice();
        mostrarProductos(obtenerProductosPorPagina());
    }
});



// Función para filtrar productos basados en la cadena de búsqueda
function buscarProductos(searchText) {
    paginaActual = 1; // Reiniciamos la pagina
    if (searchText.length > 0) { // Si se ha introducido algo en el buscador
        // Filtramos los productos que coinciden con la búsqueda
        productosFiltrados = listaProductos.filter(producto => {
            return producto.nombre.toLowerCase().includes(searchText.toLowerCase());
        });
    } else {
        // Si no hay texto de búsqueda, mostramos todos los productos
        productosFiltrados = listaProductos.slice();
    }
    mostrarProductos(obtenerProductosPorPagina()); // Mostrar productos de la nueva búsqueda
}


// Funcion para mostrar la info. completa de un producto en concreto
function mostrarDetallesProducto(id) {
    const producto = listaProductos.find(p => p.id == id);
    let detalleExtra = ""; 
    // Preparamos la etiqueta para el campo adicional dependiendo del tipo de producto
    detalleExtra=obtenerCampoAdicional(producto)
    // Crear el fondo semitransparente
    const overlay = document.createElement("div");
    overlay.id = "div1-opacidad";
    // Crear el contenedor del producto
    const detalleProducto = document.createElement("div");
    detalleProducto.id = "div2-detallesProducto";
    detalleProducto.innerHTML = `
        <div class="container">
            <div class="row infoProducto">
                <div class="col-4">
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </div>
                <div class="col-8">
                    <h3>${producto.nombre}</h3>
                    <p><strong>Precio:</strong> ${producto.precio}€</p>
                     ${detalleExtra}
                    <p><strong>Descripción:</strong> ${producto.descripcion}</p>
                </div>
            </div>
        </div>
`;
    // Agregar los elementos al documento
    document.body.appendChild(overlay);
    document.body.appendChild(detalleProducto);
    // Cerrar la ventana al hacer clic en el fondo
    overlay.addEventListener("click", cerrarDetallesProducto);
}

// Función para cerrar la ventana de detalles de un producto cuando se haga clic fuera
function cerrarDetallesProducto() {
    document.getElementById("div1-opacidad")?.remove();
    document.getElementById("div2-detallesProducto")?.remove();
}

// Obtener elementos necesarios para trabajar con el DRAG&FROP
const dropArea = document.getElementById("arrastrarArchivo");
const inputFile = document.getElementById("seleccionArchivo");
const fileNameDisplay = document.getElementById("file-name");
const dropAreaOriginalText = dropArea.textContent;
const mensajeErrorProdNuevo = document.getElementById("mensajeError");
const mensajeProdNuevo = document.getElementById("mensajeProductoNuevo");
mensajeErrorProdNuevo.textContent=""; // Vaciamos el contenido a mostrar

// Función para validar el tipo de fichero, comprovar si hay varios y asignar el archivo
function handleFile(file, vieneDeDrop) {
    if (vieneDeDrop && inputFile.files.length > 0) { // Si ya hay una imagen
        mensajeErrorProdNuevo.textContent = "ERROR : No es posible insertar varias imagenes";
        mostrarMensaje(mensajeErrorProdNuevo);
    // Verificar el tipo de archivo (JPEG o PNG)
    } else if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
        // Insertamos la imagen en el input file
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        inputFile.files = dataTransfer.files;
        // Cambiar el texto del input para mostrar el nombre del archivo
        fileNameDisplay.textContent = file.name; 
        // Mostrar mensaje de que se ha añadido la imagen bien
        if(vieneDeDrop){
            dropArea.textContent = "¡Elemento Añadido!";
            setTimeout(() => dropArea.textContent = dropAreaOriginalText, 2000);
        }
    } else {
        // Si el archivo no es válido
        mensajeErrorProdNuevo.textContent = "La imagen debe ser JPG/JPEG o PNG.";
        mostrarMensaje(mensajeErrorProdNuevo)
    }
}
// Manejo de cambio de archivo en input file
inputFile.addEventListener("change", function () {
    if (this.files && this.files[0]) {
        handleFile(inputFile.files[0], false);
    }
});
// Manejo de que hacer cuando hay un se esta arrastrando algo por encima
dropArea.addEventListener("dragover", event => {
    event.preventDefault();
    dropArea.style.border = "2px dashed red";
});
// Manejo de que hacer cundo se deje de detectar algo por encima
dropArea.addEventListener("dragleave", () => {
    dropArea.style.border = "";
});
// Manejo de cuando se suelta la imagen
dropArea.addEventListener("drop", event => {
    event.preventDefault();
    dropArea.style.border = "";
    if (event.dataTransfer.files.length > 0) {
        handleFile(event.dataTransfer.files[0], true);
    }
});

//para el codigo de descuento

let descuentoAplicado = false; // Bandera para controlar si el descuento se aplica o no

document.addEventListener("DOMContentLoaded", function () {
    const aplicarCodigoBtn = document.getElementById("aplicarCodigoDescuento");
    const codigoDescuentoInput = document.getElementById("codigoDescuentoInput");
    const mensajeDescuento = document.getElementById("mensajeDescuento");

    aplicarCodigoBtn.addEventListener("click", function () {
        let codigoIngresado = codigoDescuentoInput.value.trim();
        let idCodigoDescuento = "descuento-codigo";

        if (!codigoIngresado) {
            mensajeDescuento.textContent = "❌ Ingresa un código de descuento.";
            mensajeDescuento.style.color = "red";
            return;
        }

        if (codigoIngresado === "INVIERNO25") {
            let precioTotal = calcularTotalSinDescuentos(); // Calcular el total sin descuentos previos
            let descuentoCodigo = precioTotal * 0.05;

            mensajeDescuento.textContent = "✅ Código aplicado correctamente.";
            mensajeDescuento.style.color = "green";

            // Verificar si el descuento ya está en el carrito
            const indiceCodigo = carrito.findIndex(item => Object.keys(item)[0] === idCodigoDescuento);

            if (indiceCodigo !== -1) {
                carrito[indiceCodigo][idCodigoDescuento].precio = -descuentoCodigo.toFixed(2);
            } else {
                carrito.push({
                    [idCodigoDescuento]: {
                        nombre: "Código Descuento INVIERNO25",
                        precio: -descuentoCodigo.toFixed(2),
                        cantidad: 1,
                        imagen: "imagenes/descuento5.jpg"
                    }
                });
            }

            descuentoAplicado = true; // Marcar que el descuento se ha aplicado
            actualizarCarrito(carrito);
        } else {
            mensajeDescuento.textContent = "❌ Código inválido.";
            mensajeDescuento.style.color = "red";
            // Si el código era incorrecto y había un descuento, lo eliminamos
            const indiceCodigo = carrito.findIndex(item => Object.keys(item)[0] === idCodigoDescuento);
            if (indiceCodigo !== -1) {
                carrito.splice(indiceCodigo, 1);
                descuentoAplicado = false; // Marcar que no hay descuento aplicado
                actualizarCarrito(carrito);
            }
        }
    });

    function calcularTotalSinDescuentos() {
        return carrito.reduce((total, producto) => {
            let productoId = Object.keys(producto)[0];
            let detalles = producto[productoId];
            return detalles.nombre.includes("Descuento") ? total : total + detalles.precio * detalles.cantidad;
        }, 0);
    }
});