import Producto from "./Producto.js";

class Videojuego extends Producto {
   // #compañia;

    constructor(nombre, precio, descripcion, imagen, compañia) {
        super(nombre, precio, descripcion, imagen);
        this._compañia = compañia;
    }

     // Getter y Setter para compañia producto tipo 1
    get compañia() {
        return this._compañia;
    }
    set compañia(nuevaCompañia) {
        this._compañia = nuevaCompañia;
    }

    
}

export default Videojuego;