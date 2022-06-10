const { user_game } = require("../models");
const moment = require('moment')
const bcrypt = require('bcrypt')

module.exports = {
    getAllViews: (req, res) => {
        user_game.findAll()
        .then((result) => {
            if (result.length > 0){
                res.render('usergames/index', { usergames: result, moment})
            }else{
                res.render('usergames/index', { usergames: result, moment})
            }
            // res.status(200).json({ message: "Success", usergame }) 
        })
        .catch((err) => {
          console.log(err);
          res.render('error', { status: res.status(500), err: err.message})
        });
    },
    getIdViews: (req, res) => {
        user_game.findOne({
            where: { 
                id: req.params.id 
            },
            attributes: ['id', 'nama_pengguna', 'email', 'kata_sandi', 'createdAt'],
         })
        .then((result) => {
            if (result) {
                // res.status(200).json({ message: "Success", usergame })
                res.render('usergames/update', { usergame: result})
              } else {
                // res.status(404).json({ message: 'User Game Tidak di temukan', usergame });
                res.render('error', { status: res.status(404), err: 'Data tidak ditemukan'})
              }
        })
        .catch((err) => {
        res.render('error', { status: res.status(500), err: err.message})
    });
        
    },
    createFormPostViews: (req, res) => {
        res.render('usergames/create')
    },
    PostViews: async (req, res) => {
        const hashedPassword = await bcrypt.hash(req.body.kata_sandi, 10)
        user_game.create({
            nama_pengguna: req.body.nama_pengguna,
            email: req.body.email,
            kata_sandi: hashedPassword,
        })
            .then((result) => {
            res.redirect('/view/usergames')
        })
            // .catch((err) => res.status(422).json("Can't create usergame"))
            .catch((err) => {
            res.render('error', { status: res.status(500), err: err.message})
            })
    },
    PutViews: async (req, res) => {
    const { nama_pengguna, email, kata_sandi } = req.body
    const hashedPassword = await bcrypt.hash(kata_sandi, 10)
    console.log(req.files)
    user_game.update(
        {
            nama_pengguna,
            email,
            kata_sandi: hashedPassword,
        },
        {
            where: { id: req.params.id},
        })
        .then((result) => {
            if (result[0] === 0){
                res.render('error', {status: res.status(404), err: 'Data tidak ditemukan'})
            }else{
                res.redirect('/view/usergames')
            }
          })
        .catch((err) => {
            res.render('error', { status: res.status(500), err: err.message })
        })
    },
    DeleteViews: (req, res) => {
        user_game.destroy({ 
            where: {
                id: req.params.id 
            } 
        })
        .then((result) => {
            if (result[0] === 0){
                res.render('error', {status: res.status(404), err: 'Data tidak ditemukan'})
            }else{
                res.redirect('/view/usergames')
            }
          })
        .catch((err) => {
            res.render('error', { status: res.status(500), err: err.message })
        })
    },
}