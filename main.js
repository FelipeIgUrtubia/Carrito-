class Producto {
    constructor(nombre, precio){
        this.nombre = nombre;
        this.precio = precio;
    }
}

class Carrito {
    constructor(){
        this.productos = [];
    }

    agregarProducto(producto, cantidad){
        this.productos.push({producto, cantidad});  
    }

    totalDeLaCompra(){
        return this.productos.reduce((total, item) => total + item.producto.precio * item.cantidad, 0);
    }

    finalizarCompra(){
        this.mostrarDetalles();
        const total = this.totalDeLaCompra();
        alert(`El total de la compra es: $${total}`);
        this.productos = [];  // Vaciar el carrito
    }

    mostrarDetalles(){
        if (this.productos.length === 0) {
            alert("El carrito está vacío.");
            return;
        }

        let detalles = "Detalles de la compra:\n";
        this.productos.forEach(item => {
            detalles += `${item.cantidad} x ${item.producto.nombre} - $${item.producto.precio} c/u\n`;
        });
        alert(detalles);
    }
}

// Arreglo de Productos
const productos = [
    new Producto("Leche", 1000),
    new Producto("Pan de Molde", 2000),
    new Producto("Queso", 1200),
    new Producto("Mermelada", 890),
    new Producto("Azúcar", 1300),
];

// Instancia del Carrito
const carritoUsuario = new Carrito();

function mostrarProductos(){
    let listaProductos = "Productos disponibles:\n";
    productos.forEach((producto, index) => {
        listaProductos += `${index + 1}.- ${producto.nombre} $${producto.precio}\n`;
    });
    alert(listaProductos);
}

function agregarAlCarrito(numeroProducto, cantidad){
    const posicion = numeroProducto - 1;
    if (posicion >= 0 && posicion < productos.length) {
        const productoSeleccionado = productos[posicion];
        carritoUsuario.agregarProducto(productoSeleccionado, cantidad);
    } else {
        alert("Producto no válido.");
    }
}

// Flujo Principal
while (true) {
    mostrarProductos();
    const numeroProducto = parseInt(prompt("Ingresa el número del producto que deseas agregar al carrito:"));
    const cantidad = parseInt(prompt("Ingresa la cantidad de unidades:"));

    if (isNaN(numeroProducto) || isNaN(cantidad) || cantidad <= 0) {
        alert("Entrada no válida. Por favor, ingresa números válidos.");
        continue;
    }

    agregarAlCarrito(numeroProducto, cantidad);

    const continuar = prompt("¿Deseas seguir agregando productos? (Si/No)").toLowerCase();
    if (continuar !== 'Si') {
        carritoUsuario.finalizarCompra();
        break;
    }
}

