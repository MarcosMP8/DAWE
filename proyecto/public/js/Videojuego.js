import Producto from "./Producto.js";

class Videojuego extends Producto {
   #compañia;

    constructor(nombre, precio, descripcion, imagen, compañia) {
        super(nombre, precio, descripcion, imagen);
        this.#compañia = compañia;
    }

     // Getter y Setter para compañia producto tipo 1
    get compañia() {
        return this.#compañia;
    }
    set compañia(nuevaCompañia) {
        this.#compañia = nuevaCompañia;
    }

    
}

export default Videojuego;