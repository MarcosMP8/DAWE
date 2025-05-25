import Producto from "../tienda/Producto";

class Merchandising extends Producto {

    constructor(nombre, precio, descripcion, imagen, fabricante) {
        super(nombre, precio, descripcion, imagen);
        this._fabricante = fabricante;
        this._tipo = "T3";
    }

     // Getter y Setter para fabricante producto tipo 3
    get fabricante() {
        return this._fabricante;
    }
    set fabricante(nuevoFabricante) {
        this._fabricante = nuevoFabricante;
    }
    get tipo() {
        return this._tipo;
    }
    
}
export default Merchandising;