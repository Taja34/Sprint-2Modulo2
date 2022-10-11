const contededorDeContactos = document.getElementById('contededorDeContactos');
import { getInfoUsuario,visto } from "./process.js";
const buscadorNombreChat = document.getElementById('buscadorNombreChat')
const contenedorFotoDePerfil = document.getElementById('contenedorFotoDePerfil')
const contenedorPerfilDelChat  = document.getElementById('contenedorPerfilDelChat')
const cont__mensajesBuscados  = document.getElementById('cont__mensajesBuscados')
const  chat = document.getElementById('chat')
const contanerEditPerfil_nombre_nombre = document.getElementById('contanerEditPerfil_nombre_nombre')
const printImageEditar = document.getElementById('printImageEdit')
export const printFotoPerfil = (usuario) => {
    contenedorFotoDePerfil.innerHTML = '';

       
        contenedorFotoDePerfil.innerHTML += `
        <figure><img src=${usuario.image} alt="" class="fotosDePerfil" id="fotosDePerfil" ></figure>
        `
    ;
}
export const printImageEdit = (image) => {
    printImageEditar.innerHTML = '';

       
    printImageEditar.innerHTML += `
    <img src=${image} alt="" class="contanerEditPerfil_foto" >
        `
    ;
}
export const printNameEdit = (name,url) => {
    contanerEditPerfil_nombre_nombre.innerHTML = '';

       
    contanerEditPerfil_nombre_nombre.innerHTML += `
       <p class="contanerEditPerfil_nombre_tuNombre">Tu nombre</p>
    <p class="contanerEditPerfil_nombre_nombre"> ${name} <img src="./img/icons/edit-2.svg" alt="" class="edit"> </p> <p class="contanerEditPerfil_nombre_tuNombre">Tu foto de perfil</p>
     <p class="urlImage">
${url}
    </p>
    
    
        `
       


}

export const printContactos = async (listdecontactos,idUser) => {
  
    contededorDeContactos.innerHTML = '';
   await  listdecontactos.forEach(async(contacto,index)  => {
       
        
       let UltimoMensaje = await getInfoUsuario(idUser,listdecontactos[index].id)
      

      
       let sd7= await UltimoMensaje[UltimoMensaje.length - 1] 
       console.log(sd7)
       if(sd7 === undefined){
        contededorDeContactos.innerHTML += `
        <div class="recuadroDelContacto" id=${contacto.id}>
        <img src=${contacto.image} alt="" class="fotosDePerfil"> <p><b class="nombreDelContacto"> ${contacto.name} </b></p> <p class="diaEscrito">  </p> <p class="ultimoMensaje">Inica una conversacion</p>
     </div>
        `
       } else{
        if(sd7.visto=== true){
       console.log(sd7)
        contededorDeContactos.innerHTML += `
        <div class="recuadroDelContacto" id=${contacto.id}>
        <img src=${contacto.image} alt="" class="fotosDePerfil"> <p><b class="nombreDelContacto"> ${contacto.name} </b></p> <p class="diaEscrito"> ${sd7.day}  </p> <img src="./img/icons/check.svg" alt=""class="chulito azul"><p class="ultimoMensaje">${sd7.mensaje}</p>
     </div>
        `
}else if(sd7.visto=== false){
    console.log(sd7)
     contededorDeContactos.innerHTML += `
     <div class="recuadroDelContacto" id=${contacto.id}>
     <img src=${contacto.image} alt="" class="fotosDePerfil"> <p><b class="nombreDelContacto"> ${contacto.name} </b></p> <p class="diaEscrito"> ${sd7.day} </p> <img src="./img/icons/check.svg" alt=""class="chulito"><p class="ultimoMensaje">${sd7.mensaje}</p>
  </div>
     `
}}});
}

export const printFotoPerfilDelChat = (usuario) => {
    contenedorPerfilDelChat.innerHTML = '';

       
    contenedorPerfilDelChat.innerHTML = `
         <figure><img src= ${usuario.image} alt="" class="fotosDePerfil"> </figure> <p class="nombreYEstado"> <b>${usuario.name}</b> Desconectado </p> 
            <figure class="lupita"><img src="./img/icons/search.svg" alt="" class="imgLupita" ></figure>
        `
}





export const pintarNombreContBuscaChat =  (usuario)=>{
    buscadorNombreChat.innerHTML = '';

       
    buscadorNombreChat.innerHTML = `
    <p class="mensajeCon"> Mensaje con ${usuario.name} </p>
        `
}

export const pintarMensajesBuscados =async(array) =>{
    cont__mensajesBuscados.innerHTML = '';
    await array.forEach(async (contacto)  => {
        if(contacto.visto){

            cont__mensajesBuscados.innerHTML += `
            <div class="MensajesBuscados">
                        <p class="fechaMensajeBuscado">${contacto.year} ${contacto.month} ${contacto.day}</p>
                        <div class="contMensajeBuscado"><img src="./img/icons/check.svg" alt="" class="azul"> ${contacto.horaMinutos} <p class="MensajeBuscadoP">${contacto.mensaje}</p></div>
                    </div>`
        } else{
            cont__mensajesBuscados.innerHTML += `
            <div class="MensajesBuscados">
                        <p class="fechaMensajeBuscado">${contacto.year} ${contacto.month} ${contacto.day}</p>
                        <div class="contMensajeBuscado"><img src="./img/icons/check.svg" alt="">  ${contacto.horaMinutos} <p class="MensajeBuscadoP"> ${contacto.mensaje}</p></div>
                    </div>`
        }
        
       
})}

export const printChat = async (mensajes,idChat,idUser) => {
   
    console.log(mensajes)
    chat.innerHTML = '';
    console.log(idChat)
    console.log(idUser)

    let bolean = false;
    let año = 1;
    let month= '';
    let day = '';




  await mensajes.forEach(async (contacto)  => {
    
   
    
   
    if(bolean === false){
        console.log(contacto)
        chat.innerHTML += `<div class="contAño">${contacto.year} ${contacto.month} ${contacto.day}</div>`
        bolean = true
    año = contacto.year,
    month =contacto.month,
    day = contacto.day
    }
    if(bolean === true){
        console.log(año)
        if(contacto.year != año){
            chat.innerHTML += `<div class="contAño">${contacto.year}</div>`
            año = contacto.year
        }
        if(contacto.month != month){
            chat.innerHTML += `<div class="contAño">${contacto.month}</div>`
            month = contacto.month
        } if(contacto.day != day){
            chat.innerHTML += `<div class="contAño">${contacto.day}</div>`
           day = contacto.day
        }
    }
   

  
    if( contacto.idUser == idUser && contacto.idChat == idChat ){
        if(contacto.visto === false){
            chat.innerHTML += `
        
            <div class="contenedorMensajeUsuario mensajeUsuarioChat"> <div class="piquito"></div><div class="mensajeUsuario mensajeUsuario2 ">${contacto.mensaje} <img src="./img/icons/check.svg" alt=""class="chulitoMensaje">  <p class="horaMinutos"> ${contacto.horaMinutos}   <img src="./img/icons/herramienta-de-tuerca-de-garaje-forma-hexagonal.png" alt="" class="tuerca" id="${contacto.id}"></p> </div> </div>
            `
        }else if(contacto.visto === true){
            chat.innerHTML += `
        
            <div class="contenedorMensajeUsuario mensajeUsuarioChat"> <div class="piquito"></div><div class="mensajeUsuario mensajeUsuario2 ">${contacto.mensaje} <img src="./img/icons/check.svg" alt=""class="chulitoMensaje azul">  <p class="horaMinutos"> ${contacto.horaMinutos}   <img src="./img/icons/herramienta-de-tuerca-de-garaje-forma-hexagonal.png" alt="" class="tuerca" id="${contacto.id}"></p> </div> </div>
            `;
            await visto(contacto.id,contacto);
        
          
        }
     
    }
else if (contacto.idUser == idChat && contacto.idChat == idUser){
    if(contacto.visto === false){
      
    
    console.log(contacto.idUser)
    chat.innerHTML +=`
    <div class="contenedorMensajeUsuario"> <div class="piquito"></div><div class="mensajeUsuario">${contacto.mensaje}<img src="./img/icons/check.svg" alt=""class="chulitoMensaje azul">  <p class="horaMinutos"> ${contacto.horaMinutos}</P></div></div>    `
    visto(contacto.id,contacto);
    }else if(contacto.visto === true){
        
        chat.innerHTML +=`
    <div class="contenedorMensajeUsuario"> <div class="piquito"></div><div class="mensajeUsuario">${contacto.mensaje}<img src="./img/icons/check.svg" alt=""class="chulitoMensaje azul">  <p class="horaMinutos"> ${contacto.horaMinutos}</P></div></div>    `
    
    }
  
}

    
})
año = '',
    month ='',
    day = ''};
