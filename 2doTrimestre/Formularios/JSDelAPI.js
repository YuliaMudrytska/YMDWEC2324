window.onload = iniciar;
function iniciar(){
    document.getElementById("enviar").addEventListener("click",validar,false)
}

function validarNombre(){
    var elemento = document.getElementById("nombre");

    if(!elemento.checkValidity()){
        
        if(elemento.validity.valueMissing){
            error2(elemento, "no puedes dejar este campo vacio");
        }
        if(elemento.validity.patternMismatch){
            error2(elemento,"Debe contener entre 2 y 15 carracteres")
        }
        return false
    }
    return true;
}//validarNombre

function validarEdad(){
    var elemento = document.getElementById("edad");

    if(!elemento.checkValidity()){
       // error(elemento);

        if(elemento.validity.valueMissing){
            error2(elemento, "no puedes dejar este campo vacio");
        }
        if(elemento.validity.rangeOverflow){
            error2(elemento,"Valor maximo 100")
        }

        if(elemento.validity.rangeUnderflow){
            error2(elemento,"Edad mínima requerida es de 18 años")
        }
        return false
    }
    return true;
}//validarEdad

function validarTelefono(){
    var elemento = document.getElementById("telefono");

    if(!elemento.checkValidity()){
        //error(elemento);

        if(elemento.validity.valueMissing){
            error2(elemento, "no puedes dejar este campo vacio");
        
        }

        if(elemento.validity.patternMismatch){
            error2(elemento,"Introduece un númeo valido")
        }
        return false

    }
    return true;
}

function validar(e){
    borrarError();

    if(validarNombre() && validarEdad() && validarTelefono && confirm("Estas segur@?")){
        return true;
    }
    else{
        e.preventDefault();
        return false;
    }
}//validar

function error(elemento){
    document.getElementById("mensajeError").innerHTML = elemento.validationMessage;
    elemento.className="error";
    elemento.focus();
}//error

function borrarError(){
    var formulario = document.forms[0];
    for (var i=0; i<formulario.elements.length; i++){
        formulario.elements[i].className= ""
    }
}

function error2(elemento,mensaje){
    document.getElementById("mensajeError").innerHTML=mensaje;
    elemento.className="error";
    elemento.focus();
}

