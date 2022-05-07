const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '', nombre ) => {
    return new Promise((resolve, reject) => {

        const payLoad = { uid, nombre };

        jwt.sign( payLoad, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '2h'
        }, (err, token) => {
            if(err) {
                console.error(err);
                reject('No se pudo generar el token');
            }else{
                resolve(token);
            }
        })

    });
}

module.exports = {
    generarJWT,
}