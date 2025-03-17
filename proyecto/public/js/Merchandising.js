import Producto from "./Producto.js";

class Merchandising extends Producto {
    #fabricante;

    constructor(nombre, precio, descripcion, imagen, fabricante) {
        super(nombre, precio, descripcion, imagen);
        this.#fabricante = fabricante;
    }

     // Getter y Setter para fabricante producto tipo 3
    get fabricante() {
        return this.#fabricante;
    }
    set fabricante(nuevoFabricante) {
        this.#fabricante = nuevoFabricante;
    }
    
}
export default Merchandising;