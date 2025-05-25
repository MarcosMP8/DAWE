import Producto from "../tienda/Producto";

class Puzzle extends Producto {

    constructor(nombre, precio, descripcion, imagen, piezas) {
        super(nombre, precio, descripcion, imagen);
        this._piezas = piezas;
        this._tipo = "T4";
    }

     // Getter y Setter para piezas producto tipo 4
    get piezas() {
        return this._piezas;
    }
    set piezas(nuevasPiezas) {
        this._piezas = nuevasPiezas;
    }
    get tipo() {
        return this._tipo;
    }
    
}
export default Puzzle;