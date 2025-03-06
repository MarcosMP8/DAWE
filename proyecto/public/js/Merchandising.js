import Producto from "./Producto.js";

class Merchandising extends Producto {

    constructor(nombre, precio, descripcion, imagen, fabricante) {
        super(nombre, precio, descripcion, imagen);
        this._fabricante = fabricante;
    }

     // Getter y Setter para fabricante producto tipo 3
    get fabricante() {
        return this._fabricante;
    }
    set fabricante(nuevoFabricante) {
        this._fabricante = nuevoFabricante;
    }
    
}
export default Merchandising;