const { Router } = require('express');
const { check } = require('express-validator');

const { createUser, 
        loginUser, 
        revalidToken } = require('../controllers/auth');

const { isEmailValid } = require('../helpers/db-validators');
const { userExistByEmail } = require('../middlewares/userField');
const { validarJWT } = require('../middlewares/validar-JWT');

const {validarCampos} = require('../middlewares/validarCampos');



const router = Router();

router.post('/new', [
    check('name', 'name is required').not().isEmpty(),
    check('email', 'email is required').isEmail(),
    check('email').custom(isEmailValid),
    check('password', 'The password must have a minimum of 6 characters').isLength({ min:6 }),
    validarCampos
],createUser );

//login
router.post('/',[
    check('email', 'email is required').isEmail(),
    userExistByEmail,
    check('password', 'The password must have a minimum of 6 characters').isLength({ min:6 }),
    validarCampos
], loginUser );

router.get('/renew',[
    validarJWT,
    validarCampos
], revalidToken);




module.exports = router;