import Producto from "../tienda/Producto";

class Libro extends Producto {

    constructor(nombre, precio, descripcion, imagen, editorial) {
        super(nombre, precio, descripcion, imagen);
        this._editorial = editorial;
        this._tipo = "T2";
    }

     // Getter y Setter para editorial producto tipo 2
    get editorial() {
        return this._editorial;
    }
    set editorial(nuevoEditorial) {
        this._editorial = nuevoEditorial;
    }
    get tipo() {
        return this._tipo;
    }
    
}
export default Libro;