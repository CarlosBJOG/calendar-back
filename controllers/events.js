
const Event = require('../models/event');

const obtenerEventos = async (req, res) => {

    try{

        const { limite = 5, desde = 0 } = req.query;

        const [total, events] = await Promise.all([
                                        Event.countDocuments( ),
                                        Event.find( )
                                            .populate( 'user', 'name' )
                                            .skip( Number( desde ) )
                                            .limit(Number( limite  ))
                                    ]);

        res.status(200).json({
            ok: true,
            total,
            events
        });

    }catch(err){
        console.error(err);
        res.status(500).json({
            msg:"Contacte al admin"
        })
    }

}

const crearEvento = async (req, res) => {

    
    try{
        const {_id: uid} = req.usuario;
        req.body.user = uid;

        const evento = new Event( req.body );
        
        await evento.save();
        
        res.status(200).json({
            ok: true,
            evento
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            msg:"Contacte al admin"
        })
    }

}


const eliminarEvento = async (req, res) => {

    const { id } = req.params;
    const {_id: uid} = req.usuario;

    try{
        const evento = await Event.findById(id);


        if(evento.user.toString() !== uid.toString() ){
            return res.status(404).json({
                ok:false,
                msg: "No tienes privilegios para modificar esta nota"
            })
        }
        
        const resp = await Event.findByIdAndDelete( id , { new: true } );

        res.status(200).json({
            ok: true,
            resp
        })
    }catch(e){
        console.log(e);
        res.status(500).json({
            msg:"Contacte al admin"
        })
    }


}


const actualizarEvento = async (req, res) => {

    const { id } = req.params;
    const {_id: uid} = req.usuario;


    try{

        const evento = await Event.findById(id);

        if(evento.user.toString() !== uid.toString() ){
            return res.status(404).json({
                ok:false,
                msg: "No tienes privilegios para modificar esta nota"
            })
        }

        const newEvent = {
            ...req.body,
            user: uid,
        }

        const enventUpdated = await Event.findByIdAndUpdate( id, newEvent, { new: true });

        res.status(200).json({
            ok:true,
            enventUpdated
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg:"Contacte al admin"
        })
    }

  
}




module.exports = {
    obtenerEventos,
    crearEvento,
    eliminarEvento,
    actualizarEvento,

}