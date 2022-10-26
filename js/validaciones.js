export const validarCampoVacio = (e) => {
  const input = e.target;
  input.value.trim() ? clearError(input) : setError(input, "Campo requerido");
};

export const validarLongitud = (e) => {

  const input = e.target;
  const texto = input.value.trim();

  if (validarLongitudMaxima(input, 25)){
    clearError(input);
  }else {
    setError(input, "El campo no puede tener más de 25 caracteres");
  }  
};

export const validarLongitudDos = (e) => {

  const input = e.target;
  const texto = input.value.trim();

  if (validarLongitudMaxima(input, 25)){
    clearError(input);
  }else {
    setError(input, "El campo no puede tener más de 25 caracteres");
  }  
};

const validarLongitudMaxima = (input, maximo) =>
  input.value.trim().length <= maximo;


export const validarRango= (e) => {
  const input = e.target;
  const valorIngresado = parseInt(input.value);
  
  if(valorIngresado >= 0 && valorIngresado <= 50000)
  {
    clearError(input);
  }
  else
  {
    setError(input, "El pecio mínimo es de 0 y el máximo de 50000");
  }
};

const setError = (input, mensaje) => {
  const $small = input.nextElementSibling;
  $small.textContent = mensaje || `${input.name} requerido`;
  input.classList.add("inputError");
  $small.classList.add("danger");
};

const clearError = (input, mensaje) => {
  const $small = input.nextElementSibling;
  $small.textContent = "";
  input.classList.remove("inputError");
  $small.classList.remove("danger");
};
