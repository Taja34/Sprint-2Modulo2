const contraseña = document.getElementById('contraseña')
const numero = document.getElementById('numero')
const buton = document.getElementById('buton')
const form__login = document.getElementById('form__login')
let data = [] 

import { getInfo } from "./process.js";
const mainFunction = async () => {
    data = await getInfo();
console.log(data)
}


mainFunction()
function saludos(e){
    e.preventDefault();
    location.href='./index.html'
   
  }
  
  


form__login.addEventListener("submit",(e)=>{
  
 let registroNumero = numero.value;
 let registroContraseña = contraseña.value;
 numero.value = '';
 contraseña.value = '';
    console.log(registroContraseña)
    
    console.log(registroNumero)
    let found = data.find(element => element.numero == registroNumero && element.contraseña == registroContraseña);
    console.log(found)
    
    
    if (found === undefined ){
        
        Swal.fire(
            'Oops!',
            'Se ha presentado un error!',
            'error'
        )

    }
    else if (found != undefined){
        localStorage.setItem("usuario", JSON.stringify(found));
        let name = found.name
        Swal.fire(
            'Excelente!',
            `${name} Bienvenido`,
            'success'
        )
       
        setTimeout(saludos(e), 10000);
    }

})
const validationSession = (e) => {
    e.preventDefault()
    const user = localStorage.getItem('usuario');
    if (user) {
        location.href = './index.html'
    }
}

(e)=>{validationSession(e)}

