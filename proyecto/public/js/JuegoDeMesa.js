import Producto from "./Producto.js";

class JuegoDeMesa extends Producto {
    #jugadores;
    #categoria;

    constructor(nombre, precio, descripcion, imagen, jugadores) {
        super(nombre, precio, descripcion, imagen);
        this.#jugadores = jugadores;
        this.#categoria = 'juego de mesa'; // Establecer la categoría por defecto
    }

     // Getter y Setter para jugadores producto tipo 5
    get jugadores() {
        return this.#jugadores;
    }
    set jugadores(nuevosJugadores) {
        this.#jugadores = nuevosJugadores;
    }
    // Getter para categoria
    get categoria() {
        return this.#categoria;
    }

    
}
export default JuegoDeMesa;