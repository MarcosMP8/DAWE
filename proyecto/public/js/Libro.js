import Producto from "./Producto.js";

class Libro extends Producto {

    constructor(nombre, precio, descripcion, imagen, editorial) {
        super(nombre, precio, descripcion, imagen);
        this._editorial = editorial;
    }

     // Getter y Setter para editorial producto tipo 2
    get editorial() {
        return this._editorial;
    }
    set editorial(nuevoEditorial) {
        this._editorial = nuevoEditorial;
    }
    
}
export default Libro;