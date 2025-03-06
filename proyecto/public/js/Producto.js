
class Producto { // Superclase

    constructor(nombre, precio, descripcion, imagen = "imagenes/sin-imagen.jpg") {
        this._id = this.guidGenerator(); // Generar un ID único
        this._nombre = nombre;
        this._precio = precio;
        this._descripcion = descripcion;
        this._imagen = imagen ;
    }

    guidGenerator(){
        var S4 = function(){
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        }
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    // Getter para id producto
    get id() {
        return this._id;
    }

    // Getter y Setter para nombre producto
    get nombre() {
        return this._nombre;
    }
    set nombre(nuevoNombre) {
        this._nombre = nuevoNombre;
    }

    // Getter y Setter para precio producto
    get precio() {
        return this._precio;
    }
    set precio(nuevoPrecio) {
        this._precio = nuevoPrecio;
    }

    // Getter y Setter para descripcion producto
    get descripcion() {
        return this._descripcion;
    }
    set descripcion(nuevaDescripcion) {
        this._descripcion = nuevaDescripcion;
    }

    // Getter y Setter para imagen producto
    get imagen() {
        return this._imagen;
    }
    set imagen(nuevaImagen) {
        this._imagen = nuevaImagen;
    }
}
export default Producto;