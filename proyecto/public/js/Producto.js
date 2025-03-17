
class Producto { // Superclase
    #id;
    #nombre;
    #precio;
    #descripcion;
    #imagen;

    constructor(nombre, precio, descripcion, imagen = "imagenes/sin-imagen.jpg") {
        this.#id = this.guidGenerator(); // Generar un ID único
        this.#nombre = nombre;
        this.#precio = precio;
        this.#descripcion = descripcion;
        this.#imagen = imagen ;
    }

    guidGenerator(){
        var S4 = function(){
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    // Getter para id producto
    get id() {
        return this.#id;
    }

    // Getter y Setter para nombre producto
    get nombre() {
        return this.#nombre;
    }
    set nombre(nuevoNombre) {
        this.#nombre = nuevoNombre;
    }

    // Getter y Setter para precio producto
    get precio() {
        return this.#precio;
    }
    set precio(nuevoPrecio) {
        this.#precio = nuevoPrecio;
    }

    // Getter y Setter para descripcion producto
    get descripcion() {
        return this.#descripcion;
    }
    set descripcion(nuevaDescripcion) {
        this.#descripcion = nuevaDescripcion;
    }

    // Getter y Setter para imagen producto
    get imagen() {
        return this.#imagen;
    }
    set imagen(nuevaImagen) {
        this.#imagen = nuevaImagen;
    }
}
export default Producto;