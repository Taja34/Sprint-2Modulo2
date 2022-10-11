
import {  getInfo,getInfoChats,getInfoChat,EditPerfilUsuario,findMensajes,getInfoMensaje,deleteMensaje,getInfoUsuario,buscarPalabra } from "./process.js";
import { UI } from "./process.js";
import { printContactos, printFotoPerfil,printFotoPerfilDelChat, printChat,printNameEdit, printImageEdit,pintarNombreContBuscaChat,pintarMensajesBuscados } from "./ui.js";

 let data = [];
 let found
 let  idUser = 2;
 let idChat = data[0];
 let icono = {}; 
let mensajeEdit;
let configChat = true;
let mensajito;


 const validationSession = () => {
  const user = localStorage.getItem('usuario');
  if (user == undefined) {
      location.href = './registro.html'
  }
}
validationSession()

const mainFunction = async () => {
     data = await getInfo();
     icono =  JSON.parse(localStorage.getItem("usuario")) ;
    console.log(icono)
    idUser = icono.id
printFotoPerfil(icono)


console.log(data)
let posicion = (icono.id -1);
let pitarUsuarios = data.splice(posicion,1)
console.log(pitarUsuarios)

let infoPintar = await getInfoUsuario(idUser,data[0].id)
if(infoPintar == false)
{ 
  idChat = data[0].id
   found = data.find(element => element.id == idChat);}
   else if(infoPintar){
    console.log('hola')
    let  obtenerUltimoId = infoPintar[infoPintar.length-1];
    console.log(obtenerUltimoId)

    if(idUser == obtenerUltimoId.idChat){
      console.log('de')
      idChat = data[0].id
      found = data.find(element => element.id == idChat);
    }
    else if(obtenerUltimoId.idUser != idChat){
      console.log('aca')
        console.log(obtenerUltimoId)
    idChat = obtenerUltimoId.idChat
    
    found = data.find(element => element.id == obtenerUltimoId.idChat);
    console.log(found)
   }
  }
  console.log(idUser)
console.log(found)
printFotoPerfilDelChat(found)


await printChat(infoPintar,idChat,idUser)


await printContactos(data,idUser)

}


mainFunction()


document.addEventListener('click',async ({ target }) => {if(target.classList.contains("recuadroDelContacto")){ let id = target.id
console.log(id)
 found = data.find(element => element.id == id );
console.log(found.id)

let icono =  JSON.parse(localStorage.getItem("usuario")) 
let idUser = icono.id;

console.log(idUser)
  idChat = found.id
console.log(idChat)
let infoPintar = await getInfoUsuario(idUser,idChat)
console.log(infoPintar)

await printChat(infoPintar,idChat,idUser)

  printFotoPerfilDelChat(found)


} else if(target.classList.contains('fotosDePerfil')){
  console.log('sa')
  let contanerEditPerfil  = document.getElementById("contanerEditPerfil");
  contanerEditPerfil.classList.remove('hidden')
  let nombre = icono.name
  let url = icono.image
  console.log()
  printImageEdit(url)
  printNameEdit(nombre,url)

} else if(target.classList.contains('flecha')){
  let contanerEditPerfil  = document.getElementById("contanerEditPerfil");
  contanerEditPerfil.classList.add('hidden')
}else if(target.classList.contains('edit')){
  let contanerEditPerfil  = document.getElementById("cont__inputEdit");
  contanerEditPerfil.classList.toggle('hidden')
  Nombre.placeHolder(icono.name)
  ImageUrl.placeHolder(icono.image)
  

}else if(target.classList.contains('tuerca')){
  console.log(target)
  mensajeEdit = target.id
  let  ContEditMensajes = document.getElementById('ContEditMensajes');
  configChat = false
  ContEditMensajes.classList.toggle('hidden')
}else if(target.classList.contains('recuadroEditar')){
   mensajito = await findMensajes(mensajeEdit)
console.log(mensajito)
inputDelChat.placeHolder(mensajito.mensaje)

}else if(target.classList.contains('recuadroEliminar')){

eliminarMensaje()


}else if (target.classList.contains('salirsesion')){
localStorage.clear();
  location.href='./index.html'
}else if (target.classList.contains('imgLupita')){
  let  buscadorDePalabra = document.getElementById('buscadorDePalabra');
  buscadorDePalabra.classList.toggle('hidden');
  pintarNombreContBuscaChat(found)
}

})
 
const eliminarMensaje = async() =>{
 
  mensajito = await findMensajes(mensajeEdit)
  await deleteMensaje(mensajeEdit);
  let infoPintar = await getInfoUsuario(idUser,idChat);
console.log(infoPintar);
 await printChat(infoPintar,idChat,idUser);
 ContEditMensajes.classList.add('hidden');

  configChat = true
  printContactos(data,idUser)
}

const handleClick = async(e) =>{
  e.preventDefault();
if (configChat === true) {
  

    let mensaje = inputDelChat.getValue() 
    console.log(idUser)
    console.log(idChat);

    let DateTime = luxon.DateTime;
    const dt = DateTime.now();
    
   
    const horaMinutos = DateTime.fromISO(dt).toFormat('h:mm a');
    console.log(horaMinutos);
    
    //Obtener día
    const day = DateTime.fromISO(dt).toFormat('cccc');
    console.log(day);
    const month = DateTime.fromISO(dt).toFormat('LLL');
    console.log(month);
    const year = DateTime.fromISO(dt).toFormat('yyyy');
    console.log(year);
    
   await getInfoChats(idUser,idChat,mensaje,horaMinutos,day,month,year)
   let infoDelMensaje = await getInfoUsuario(idUser,idChat)
   console.log(infoDelMensaje)
   await printChat(infoDelMensaje,idChat,idUser)
await printContactos(data,idUser)
  inputDelChat.limpiarValue()


}

else if(configChat === false){

  let mesajeEditado = inputDelChat.getValue()
mensajito.mensaje = mesajeEditado
console.log(mensajito)
await getInfoMensaje(mensajeEdit,mensajito);
let infoPintar = await getInfoUsuario(idUser,idChat);
console.log(infoPintar);
 await printChat(infoPintar,idChat,idUser);
inputDelChat.limpiarValue();
ContEditMensajes.classList.add('hidden')
configChat = true
 
}
 }



 

 const perfilEdit = async (e) =>{
  e.preventDefault();
  
 let nombre = Nombre.getValue()
 let url =  ImageUrl.getValue()

  console.log(nombre, url,idUser)

  EditPerfilUsuario(idUser, nombre, url, icono)
  printImageEdit(url)
 icono = await JSON.parse(localStorage.getItem("usuario")) ;
 console.log(icono)
  printNameEdit(nombre, url)
  printFotoPerfil(icono)
    Nombre.limpiarValue()
    ImageUrl.limpiarValue()
  
}
const handleSerchP =async(e)=>{
  e.preventDefault();
  console.log('ds')
  let valor = inputDeBusquedaDePalabraChat.getValue();

let Mensajes = await buscarPalabra(idUser,idChat,valor);
console.log(Mensajes)
await pintarMensajesBuscados(Mensajes)

}

 const handleSerch = async(e) =>{
  e.preventDefault();
  let mensaje = inputDeBusquedaEnLosContactos.getValue()
  let found = data.find(element => element.name.toUpperCase() == mensaje.toUpperCase() );
console.log(found)
let serch = []
serch.push(found)
if(found == undefined){
  printContactos(data,idUser)
}else if(found){
printContactos(serch,idUser) 
}}


function myFunction(x) {
  if (x.matches) { // If media query matches
    let  contenedorChat = document.getElementById('contenedorChat');
    contenedorChat.classList.add('hidden');
    contenedorChat.classList.add('cien');
    document.addEventListener('click',async ({ target }) => {
      if(target.classList.contains("recuadroDelContacto")){
      let  contenedorChat = document.getElementById('contenedorChat');
    contenedorChat.classList.remove('hidden');
    let  contenedorContactos = document.getElementById('contenedorContactos');
    contenedorContactos.classList.add('hidden');
    let retroceso =document.getElementById('retroceso')
    retroceso.classList.remove('hidden')

    } if(target.classList.contains('retroceso')){
      let  contenedorChat = document.getElementById('contenedorChat');
      contenedorChat.classList.add('hidden');
      let  contenedorContactos = document.getElementById('contenedorContactos');
    contenedorContactos.classList.remove('hidden');
    }

    })}
   else {
    document.body.style.backgroundColor = "white";
  }
}

var x = window.matchMedia("(max-width: 375px)")
myFunction(x) // Call listener function at run time
x.addListener(myFunction) // Attach listener function on state changes


 const inputDelChat = new UI('inputDelChat') 
 const formInputDeBusquedaEnLosContactos = new UI('formInputDeBusquedaEnLosContactos','submit',(e) => { handleSerch(e) })
const btnEnviar = new UI('form__input', 'submit', (e) => { handleClick(e) });
const inputDeBusquedaEnLosContactos = new UI('inputDeBusquedaEnLosContactos')
const formInputDeBusquedaDePalabraChat = new UI ('formInputDeBusquedaDePalabraChat','submit',(e)=>{handleSerchP(e)})
const inputDeBusquedaDePalabraChat=new UI('inputDeBusquedaDePalabraChat')
const formEdit = new UI('formEdit', 'submit', (e) => { perfilEdit(e) });
;
const Nombre = new UI('Nombre')
const ImageUrl = new UI('ImageUrl')
formEdit.listenEvent()

formInputDeBusquedaDePalabraChat.listenEvent()
formEdit.listenEvent()
 btnEnviar.listenEvent()
formInputDeBusquedaEnLosContactos.listenEvent()







