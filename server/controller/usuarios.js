const {request,response} = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const getUsuarios = async(req, res = response) =>{


    const usuarios = await Usuario.findAll();

    res.json({usuarios});


}

const getUsuario = async(req, res = response) =>{

    const {id} = req.params;

    const usuario = await Usuario.findByPk(id);

    res.json({usuario});

}

const postUsuario = async(req, res = response) => {

    const {nombre,paterno,materno,email,password,estado = true} = req.body;
    const usuario = Usuario.build({nombre,paterno,materno,email,password,estado});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);

    await usuario.save();
    
    res.json({usuario})

}


const putUsuario = async(req,res = response) => {

    const {id} = req.params;
    const {body} = req;

    try{

        const usuario = await Usuario.findByPk(id);

        if(!usuario){
            return res.status(404).json({
                msg: `no existe un usuario con el id ${id}`
            })
        }

        await usuario.update(body);

        res.json(usuario);
        
    }catch(error){
        console.log(error);
        res.status(505).json({
            msg:'Hable con el administrador'
        })
    }

}

const deleteUsuario = async(req, res = response) =>{

    const {id} = req.params;

    const usuario = await Usuario.findByPk(id);
    if(!usuario){
        return res.status(404).json({
            msg: `no existe un usuario con el id ${id}`
        })
    }
    
    await usuario.destroy();

    res.json(usuario);


}

module.exports = {getUsuarios,
                  getUsuario,
                  postUsuario,
                  putUsuario,
                  deleteUsuario}