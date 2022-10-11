import { getInfo } from "./process.js";
const URL = "https://back-waths.herokuapp.com/usuarios"
class UI {
    constructor(targetID) {
        this.target = document.getElementById(targetID);
    }

    getValue() {
        return this.target.value;
    }
}

const identification = new UI('name');
const password = new UI('contraseña');
const numero = new UI('numero');
const image = new UI('image');
const form = document.getElementById('form__login');

const handleSubmit = async (e) => {
    e.preventDefault();
    //new object from values
    let response = await getInfo();
    let id = response[response.length-1].id
    console.log(id)
    let di = id + 1;
    const user = {
      id: di,
        name:  identification.getValue(),
        numero: Number(numero.getValue()),
        contraseña: Number( password.getValue()),
        image: image.getValue()
    }
    //validations
    for (const key in user) {
        const element = user[key];
        if (element === '') {
            alert(`Falta llenar el campo ${key}`)
            return;
        }
    }
    //send to back
    try {
        let response = await getInfo();
        let found = response.find(element => element.numero == numero.getValue && element.contraseña == password.getValue);
        console.log(found)
        
        if (found == undefined) {
            if (found == undefined) {
                console.log(user)
                //save localStorage session
                localStorage.setItem('usuario', JSON.stringify(user));

 axios.post(URL, {

    name: identification.getValue(),
    numero:    Number( numero.getValue()),
    contraseña: Number( password.getValue()),
    image: image.getValue() })
                location.href = './index.html'
            }else {
                Swal.fire(
                    'Oops!',
                    'Usuario o contraseña incorrecta!',
                    'error'
                )
            }
        }
    } catch (error) {
        console.log(error);
        Swal.fire(
            'Oops!',
            'Se ha presentado un error!',
            'error'
        )
    }
}

const validationSession = () => {
    const user = localStorage.getItem('usuario');
    if (user) {
        location.href = './index.html'
    }
}

validationSession()

form.addEventListener('submit', (e) => { handleSubmit(e) })