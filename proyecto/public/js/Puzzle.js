import Producto from "./Producto.js";

class Puzzle extends Producto {
    #piezas;

    constructor(nombre, precio, descripcion, imagen, piezas) {
        super(nombre, precio, descripcion, imagen);
        this.#piezas = piezas;
    }

     // Getter y Setter para piezas producto tipo 4
    get piezas() {
        return this.#piezas;
    }
    set piezas(nuevasPiezas) {
        this.#piezas = nuevasPiezas;
    }
    
}
export default Puzzle;