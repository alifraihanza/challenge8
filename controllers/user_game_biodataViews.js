const { user_game_biodata } = require("../models");
const moment = require('moment')
const bcrypt = require('bcrypt')

module.exports = {
  getAllViews: (req, res) => {
    user_game_biodata.findAll()
    .then((result) => {
        if (result.length > 0){
            res.render('usergamesbiodata/index', { usergamesbiodata: result, moment})
        }else{
            res.render('usergamesbiodata/index', { usergamesbiodata: result, moment})
        }
        // res.status(200).json({ message: "Success", usergame }) 
    })
    .catch((err) => {
      console.log(err);
      res.render('error', { status: res.status(500), err: err.message})
    });
},
    getIdViews: (req, res) => {
        user_game_biodata.findOne({
           where: { id: req.params.id } })
           .then((result) => {
            if (result) {
                // res.status(200).json({ message: "Success", usergame })
                res.render('usergamesbiodata/update', { usergamebiodata: result})
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
      res.render('usergamesbiodata/create')
    },
    PostViews: (req, res) => {
        user_game_biodata.create({
            id_pengguna: req.body.id_pengguna,
            nama: req.body.nama,
            tanggal_lahir: req.body.tanggal_lahir,
            umur: req.body.umur,
            jenis_kelamin: req.body.jenis_kelamin,
        })
        .then((result) => {
          res.redirect('/view/usergamesbiodata')
        })
          // .catch((err) => res.status(422).json("Can't create usergame"))
          .catch((err) => {
          res.render('error', { status: res.status(500), err: err.message})
        })
    },
    PutViews: (req, res) => {
    const {  nama, tanggal_lahir, umur, jenis_kelamin } = req.body;
    user_game_biodata.update(
      {
        nama,
        tanggal_lahir,
        umur,
        jenis_kelamin,
      },
      {
        where: { id: req.params.id},
      })
      .then((result) => {
        if (result[0] === 0){
            res.render('error', {status: res.status(404), err: 'Data tidak ditemukan'})
        }else{
            res.redirect('/view/usergamesbiodata')
        }
      })
    .catch((err) => {
        res.render('error', { status: res.status(500), err: err.message })
    })
    },
    DeleteViews: (req, res) => {
        user_game_biodata.destroy({
           where: { 
             id: req.params.id 
            } 
        })
        .then((result) => {
          if (result[0] === 0){
              res.render('error', {status: res.status(404), err: 'Data tidak ditemukan'})
          }else{
              res.redirect('/view/usergamesbiodata')
          }
        })
      .catch((err) => {
          res.render('error', { status: res.status(500), err: err.message })
      })
    },
}