
const User = require('../models/user');
const Event = require('../models/event');


//email valid
const isEmailValid = async ( email ='' ) => {
    //verificar si el correo existe
    const existeEmail = await User.findOne({email});
    if( existeEmail ) {
        throw new Error(`The mail ${email} is already registered in the database`);
    }      
}


// //existe evento 
const existEvent = async ( id = '') => {
    const evento = await Event.findById(id);
    if( !evento ) {
        throw new Error(`Event with id: ${id}, don't exist`);
    }
}

// const coleccionesPermitidas = (coleccion ='', colecciones = []) => {
//     // const incluida = colecciones.includes(coleccion);
//     if( !colecciones.includes(coleccion) ) throw new Error(`La coleccion ${coleccion} no esta permitida, ${ colecciones }`)
//     return true;
// }



module.exports = {

    isEmailValid,
    existEvent
    

}