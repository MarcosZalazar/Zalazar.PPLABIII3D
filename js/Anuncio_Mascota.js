import { Anuncio } from './anuncio.js';

export class Anuncio_Mascota extends Anuncio{
    
    constructor(id,titulo, descripcion, precio,animal, raza, fechaNacimiento, vacunado){
        super(id,titulo, descripcion, precio);
        this.animal = animal;
        this.raza = raza;
        this.fechaNacimiento = fechaNacimiento;
        this.vacunado = vacunado;
    }
}