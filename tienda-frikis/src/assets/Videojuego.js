import Producto from "../tienda/Producto";

class Videojuego extends Producto {
   // #compañia;

    constructor(nombre, precio, descripcion, imagen, compañia) {
        super(nombre, precio, descripcion, imagen);
        this._compañia = compañia;
        this._tipo = "T1";
    }

     // Getter y Setter para compañia producto tipo 1
    get compañia() {
        return this._compañia;
    }
    set compañia(nuevaCompañia) {
        this._compañia = nuevaCompañia;
    }
    get tipo() {
        return this._tipo;
    }

    
}

export default Videojuego;