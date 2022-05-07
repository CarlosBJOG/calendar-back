const { Router } = require('express');
const { check } = require('express-validator');



const { obtenerEventos, crearEvento, eliminarEvento, actualizarEvento } = require('../controllers/events');
const { existEvent } = require('../helpers/db-validators');
const isDate = require('../helpers/isDate');
const { validarJWT } = require('../middlewares/validar-JWT');
const { validarCampos } = require('../middlewares/validarCampos');

const router = Router();


router.use(  validarJWT );

router.get('/', [
    
    validarCampos
], obtenerEventos);

router.post('/', [
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'date start is required').custom( isDate ),
    check('end', 'date end is required').custom( isDate ),
    validarCampos
], crearEvento);

router.put('/:id', [
    check('id', 'ID required').not().isEmpty(),
    check('id', 'ID invalid, is not mongoid valid').isMongoId(),
    check('id').custom(existEvent),
    check('title', 'Title is required').not().isEmpty(),
    check('start', 'date start is required').custom( isDate ),
    check('end', 'date end is required').custom( isDate ),
    validarCampos
], actualizarEvento);

router.delete('/:id', [
    check('id', 'ID required').not().isEmpty(),
    check('id', 'ID invalid, is not mongoid valid').isMongoId(),
    check('id').custom(existEvent),
    validarCampos
], eliminarEvento);



module.exports = router;

