import Producto from "./Producto.js";

class Libro extends Producto {
    #editorial;

    constructor(nombre, precio, descripcion, imagen, editorial) {
        super(nombre, precio, descripcion, imagen);
        this.#editorial = editorial;
    }

     // Getter y Setter para editorial producto tipo 2
    get editorial() {
        return this.#editorial;
    }
    set editorial(nuevoEditorial) {
        this.#editorial = nuevoEditorial;
    }
    
}
export default Libro;