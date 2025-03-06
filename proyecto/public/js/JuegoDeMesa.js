import Producto from "./Producto.js";

class JuegoDeMesa extends Producto {

    constructor(nombre, precio, descripcion, imagen, jugadores) {
        super(nombre, precio, descripcion, imagen);
        this._jugadores = jugadores;
        this._categoria = 'juego de mesa'; // Establecer la categoría por defecto
    }

     // Getter y Setter para jugadores producto tipo 5
    get jugadores() {
        return this._jugadores;
    }
    set jugadores(nuevosJugadores) {
        this._jugadores = nuevosJugadores;
    }
    // Getter para categoria
    get categoria() {
        return this._categoria;
    }

    
}
export default JuegoDeMesa;