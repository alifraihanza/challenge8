const { user_game_biodata } = require("../models");
const jwt = require('jsonwebtoken')


module.exports = {
  getAllApi: (req, res) => {
    const token = req.body.token || req.query.token || req.headers['authorization'];
    const role  = jwt.decode(token);
    console.log(role)
    if (role.role_id != 1) {
        return res.status(401).json({
        'message': 'Unauthorized! You are not allowed to access all data'
    })
    }
    user_game_biodata.findAll()
    .then((usergamebiodata) => {
        // pakai ini untuk swagger
        res.status(200).json({ message: "Success", usergamebiodata });
    })
    .catch((err) => {
      console.log(err);
    });
},
    getId: (req, res) => {
       const token = req.body.token || req.query.token || req.headers['authorization'];
        const role  = jwt.decode(token);
        console.log(role)
        if (role.role_id != 1 && req.params.id != role.id) {
            return res.status(401).json({
                'message': 'Unauthorized! You are not allowed to access this page'
            })
        }
        user_game_biodata.findOne({ where: { id: req.params.id } })
        .then((usergamebiodata) => {
          console.log(req.params.id, usergamebiodata);
          res.status(200).json({ message: "Success", usergamebiodata });
        })
        .catch((error) => 
          res.status(422).json({ message: "Error get data", error })
        );
    },
    Post: (req, res) => {
        const token = req.body.token || req.query.token || req.headers['authorization'];
        const role  = jwt.decode(token);
        console.log(role)
        if (role.role_id != 1) {
            return res.status(401).json({
            'message': 'Unauthorized! You are not allowed to access all data'
        })
        }
        user_game_biodata.create({
            id_pengguna: req.body.id_pengguna,
            nama: req.body.nama,
            tanggal_lahir: req.body.tanggal_lahir,
            umur: req.body.umur,
            jenis_kelamin: req.body.jenis_kelamin,
        })
            .then((usergamebiodata) => {
            res.status(201).json({ message: "Success menambahkan data", usergamebiodata });
        })
        .catch((err) => res.status(422).json("Can't create usergame"));
    },
    Put: (req, res) => {
    const {  nama, tanggal_lahir, umur, jenis_kelamin } = req.body;
    const token = req.body.token || req.query.token || req.headers['authorization'];
        const role  = jwt.decode(token);
        console.log(role)
        if (role.role_id != 1 && req.params.id != role.id) {
            return res.status(401).json({
                'message': 'Unauthorized! You are not allowed to access this page'
            })
        }
    user_game_biodata.update(
      {
        nama,
        tanggal_lahir,
        umur,
        jenis_kelamin
      },
      {
        where: { id: req.params.id},
      })
      .then((usergamebiodata) => {
        res.status(201).json({ message: "Success", usergamebiodata });
      })
      .catch((err) => res.status(422).json(err));
    },
    Delete: (req, res) => {
        const token = req.body.token || req.query.token || req.headers['authorization'];
        const role  = jwt.decode(token);
        console.log(role)
        if (role.role_id != 1 && req.params.id != role.id) {
            return res.status(401).json({
                'message': 'Unauthorized! You are not allowed to access this page'
            })
        }
        user_game_biodata.destroy({ where: { id: req.params.id } })
        .then((usergamebiodata) => {
        res.status(200).json({ message: "usergamebiodata dihapus", usergamebiodata });
    })
    .catch((err) => res.status(422).json(err));
    },
}