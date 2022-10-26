import { crearTabla } from './tablaDinamica.js'
import { Anuncio_Mascota } from './Anuncio_Mascota.js';
import {
    validarCampoVacio,
    validarLongitud,
    validarLongitudDos,
    validarRango,
  } from "./validaciones.js";

const $divTabla=document.getElementById("divTabla");
const anuncios=JSON.parse(localStorage.getItem("anuncios")) || [];
actualizarTabla();

const $formulario=document.forms[0];
const { txtId, txtTitulo, txtDescripcion, rbtAnimal, txtPrecio,txtRaza, txtFechaNacimiento, txtVacuna } = $formulario;
const controles = $formulario.elements;

for (let i = 0; i < controles.length; i++){
  const control = controles.item(i);

  if (control.matches("input")){
    if (control.matches("[type=button]")){
      continue;
    }
    else{
      control.addEventListener("blur", validarCampoVacio);
    }
  }
  
  if(control.matches("#txtTitulo")){
    control.addEventListener("input", validarLongitud);
  }
  else if(control.matches("#txtDescripcion"))
  {
    control.addEventListener("input", validarLongitudDos)
  }
  else if(control.matches("#txtPrecio")){
    control.addEventListener("change", validarRango);
  }
  
}

window.addEventListener("click",(e)=>{
    if(e.target.matches("td")){
        console.log(e.target.parentElement.dataset.id);
        let id=e.target.parentElement.dataset.id;

        cargarFormulario(anuncios.find((anuncio)=>anuncio.id==id));
    } 
    else if(e.target.matches("#btnEliminar")){
        handlerDelete(parseInt($formulario.txtId.value));
        $formulario.reset();
    }  
});

function cargarFormulario(anuncio){
  const {txtId, txtTitulo, txtDescripcion, rbtAnimal, txtPrecio,txtRaza, txtFechaNacimiento, txtVacuna } = $formulario;
  
  txtId.value=anuncio.id;
  txtTitulo.value=anuncio.titulo;
  txtDescripcion.value=anuncio.descripcion;
  rbtAnimal.value=anuncio.animal;
  txtPrecio.value=anuncio.precio;
  txtFechaNacimiento.value=anuncio.fechaNacimiento;
  txtVacuna.value=anuncio.vacunado;
}

$formulario.addEventListener("submit",(e)=>{
    e.preventDefault();
     
    if(validarEnvio()&& !validarFormSinCompletar()){
      const {txtId, txtTitulo, txtDescripcion, rbtAnimal, txtPrecio,txtRaza, txtFechaNacimiento, txtVacuna } = $formulario;

        const formAnuncio =new Anuncio_Mascota(txtId.value,txtTitulo.value,txtDescripcion.value,txtPrecio.value,rbtAnimal.value,
                                               txtRaza.value,txtFechaNacimiento.value,txtVacuna.value);
    
        if(txtId.value === ''){
            formAnuncio.id=Date.now();
            handlerCreate(formAnuncio);
        }
        else{
            handlerUpdate(formAnuncio);
        }
        $formulario.reset();
    }
    else{
        return;
    }
})

const handlerCreate = (nuevoAnuncio)=>{
    anuncios.push(nuevoAnuncio);
    
    actualizarStorage(anuncios);
    actualizarTabla(); 
}

const handlerUpdate = (anuncioEditado) =>{

    let indice = anuncios.findIndex((anuncio)=>{
        return anuncio.id==anuncioEditado.id;
    })
    anuncios.splice(indice,1);
    anuncios.push(anuncioEditado);

    actualizarStorage(anuncios);
    actualizarTabla();
}

const handlerDelete = (id)=>{
    let indice = anuncios.findIndex((anuncio)=>{
        return anuncio.id==id;
    })
    anuncios.splice(indice,1);

    actualizarStorage(anuncios);
    actualizarTabla();
}

function actualizarTabla(){
    while($divTabla.hasChildNodes()){
        $divTabla.removeChild($divTabla.firstElementChild);
    }
    const data =JSON.parse(localStorage.getItem("anuncios"));
    if(data){
        $divTabla.appendChild(crearTabla(anuncios));
    }
};

const actualizarStorage=(data)=>{
    localStorage.setItem("anuncios",JSON.stringify(data));
}

function validarEnvio(){
    const controles = $formulario.elements;

    for (const control of controles) {
      if (control.classList.contains("inputError")) {
        return false;
      }
    }
    return true;
};
  
function validarFormSinCompletar(){
    if ($formulario.txtTitulo.value== "" &&
        $formulario.txtDescripcion.value== "" &&
        $formulario.txtPrecio.value== "" &&
        $formulario.txtRaza.value== "" &&
        $formulario.txtFechaNacimiento.value== ""){
        return true;
    }
    return false;
};
