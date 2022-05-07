const User = require('../models/user');


const userExistByEmail = async ( req, res, next ) => {
    const { email } = req.body;
    const user = await User.findOne( {email } );

    if( !user ) return res.status(400).json({ msg: "Usuario / Password incorrectos - correo" });
    
    next();
}

module.exports = {
    userExistByEmail
};