const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validarJWT = async ( req = request, res = response, next ) => {
    
    const token = req.header('x-token');
    
    if( !token ) return res.status( 401 ).json({ msg: 'No hay token en la peticion' });

    try{

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const usuario = await User.findById( uid );
        
        
        if(!usuario) return res.status( 401 ).json({ msg: 'Token no valido: El usuario no existe en la BD' });

        if(!usuario.status) return res.status( 401 ).json({ msg: 'Token no valido: El usuario no esta activo en la BD' });

        req.usuario = usuario;

        next();

    }catch( error ){
        console.log(error);
        res.status(401).json({ msg: 'Token no valido' });
    }

}

module.exports = {
    validarJWT,

}
