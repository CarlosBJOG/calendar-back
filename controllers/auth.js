const bcryptjs = require('bcryptjs');
const { encriptarHash } = require('../helpers/encriptar');
const { generarJWT } = require('../helpers/generarJwt');
const User = require('../models/user');

const createUser = async ( req, res ) => {

    try{
        const { name, email, password } = req.body;

        const newPassword = encriptarHash(password);

        const user = new User( { name, email, password: newPassword });
    
        await user.save();

        const { _id: uid } = user;

        const token = await generarJWT( uid, name );
    
        res.status(201).json({
            user,
            token
        })

    }catch( err ){
        console.error( err );
        res.status(500).json({
            msg: 'Contact admin'
        })
    }
}

const loginUser = async ( req, res ) => {
    const {email, password} = req.body;

    try{

        const usuario = await User.findOne({ email });

        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ) return res.status(400).json({msg: "Usuario / Password Incorrectos - password"})


        const token = await generarJWT( usuario.id, usuario.name );

        res.json({
            usuario,
            token
        })
        
    }catch(error){
        console.error(error);
        return res.status(500).json({
            msg: 'hable con el administrador'
        })
    }
}


const revalidToken = async ( req, res ) => {
    
    const user = req.usuario;

    const { _id: uid, email, name } = user;
    const token = await generarJWT( uid, name );


    res.status(200).json({
        uid,
        email,
        name,
        token
        
    })
}


module.exports = {
    createUser,
    loginUser,
    revalidToken,
}