import Producto from "./Producto.js";

class Puzzle extends Producto {

    constructor(nombre, precio, descripcion, imagen, piezas) {
        super(nombre, precio, descripcion, imagen);
        this._piezas = piezas;
    }

     // Getter y Setter para piezas producto tipo 4
    get piezas() {
        return this._piezas;
    }
    set piezas(nuevasPiezas) {
        this._piezas = nuevasPiezas;
    }
    
}
export default Puzzle;