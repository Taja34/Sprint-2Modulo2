export const getInfo = async () => {
    const URL = "https://back-waths.herokuapp.com/usuarios"
    const { data } = await axios.get(URL);
  
    return data;
}
export const getInfoUsuario = async (idUser, idChat) => {
    const URL = `https://back-waths.herokuapp.com/chats?idUser=${idUser}&idChat=${idChat}&idUser=${idChat}&idChat=${idUser}`
 
    const { data } = await axios.get(URL);
  
    return data;
}
export const getInfoChat = async () => {
     const URL =  "https://back-waths.herokuapp.com/chats"
    const { data } = await axios.get(URL);
  
    return data;
}
export const getInfoMensaje = async (id,mensaje) => {
    const URL =  `https://back-waths.herokuapp.com/chats/${id}`
    await axios.put(URL,mensaje);
 

}
export const deleteMensaje = async (id) => {
    const URL =  `https://back-waths.herokuapp.com/chats/${id}`
    await axios.delete(URL);
 

}
export const getInfoChats = async (idUser,idChat,mensaje,horaMinutos,day,month,year) => {
    const URL = "https://back-waths.herokuapp.com/chats"
   await axios.post(URL, {
        idUser: idUser,
        idChat: idChat,
        mensaje: mensaje,
        horaMinutos: horaMinutos,
        day: day,
        month:month,
        year:year,
        visto: false
    })
  
}
export const EditPerfilUsuario = async(id, nombre, url,icono) => {
    console.log(icono)
    icono.name = nombre;
    icono.image = url;
    localStorage.setItem("usuario", JSON.stringify(icono));
    console.log(nombre)
const URL = `https://back-waths.herokuapp.com/usuarios/${id}`
await axios.put(URL,icono);
 
}
export const findMensajes = async(id) => {
  

const URL = `https://back-waths.herokuapp.com/chats/${id}`
 const {data}= await axios.get(URL);
return  data
 
}
export const visto = async(id,mensaje) => {
  

    const URL = `https://back-waths.herokuapp.com/chats/${id}`
    mensaje.visto = true
     await axios.put(URL,mensaje);
   
     const {data}= await axios.get(URL);
return  data
    }

export const buscarPalabra = async(idUser,idChat,valor) =>{
    const URL = `https://back-waths.herokuapp.com/chats?mensaje_like=${valor}&idUser=${idUser}&idChat=${idChat}&idUser=${idChat}&idChat=${idUser}`

const {data}= await axios.get(URL);
return  data
}


export class UI {
    constructor(idTarget, nameEvent = 'click', event = () => { }) {
        this.target = document.getElementById(idTarget);
        this.nameEvent = nameEvent,
            this.event = event;
    }

    listenEvent() {
        this.target.addEventListener(this.nameEvent, this.event)
    }

    getValue() {
        return this.target.value;
    }
    limpiarValue(){
        return this.target.value = '';
    }
placeHolder(placeHolder){
    return this.target.value= placeHolder;
}
}

