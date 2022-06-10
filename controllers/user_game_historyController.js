const { user_game_history } = require("../models");
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
        user_game_history.findAll()
        .then((usergamehistory) => {
            //pakai ini untuk swagger
            res.status(200).json({ message: "Success", usergamehistory }); 
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
        user_game_history.findOne({ where: { id: req.params.id } })
        .then((usergamehistory) => {
          console.log(req.params.id, usergamehistory);
          res.status(200).json({ message: "Success", usergamehistory });
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
        user_game_history.create({
            id_pengguna: req.body.id_pengguna,
            menang: req.body.menang,
            kalah: req.body.kalah,
            tanggal_history: req.body.tanggal_history,
            video: req.files[0].filename,
        })
            .then((usergamehistory) => {
            res.status(201).json({ message: "Success menambahkan data", usergamehistory });
        })
            .catch((err) => res.status(422).json("Can't create usergame"));
    },
    Put: (req, res) => {
        const {  menang, kalah, tanggal_history, } = req.body;
        const token = req.body.token || req.query.token || req.headers['authorization'];
        const role  = jwt.decode(token);
        console.log(role)
        if (role.role_id != 1 && req.params.id != role.id) {
            return res.status(401).json({
                'message': 'Unauthorized! You are not allowed to access this page'
            })
        }
        user_game_history.update({
            menang,
            kalah,
            tanggal_history,
            video: req.files[0].filename,
        },
        {
            where: { id: req.params.id},
        })
        .then((usergamehistory) => {
            res.status(201).json({ message: "Success", usergamehistory });
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
        user_game_history.destroy({ where: { id: req.params.id } })
        .then((usergamehistory) => {
            res.status(200).json({ message: "usergamehistory dihapus", usergamehistory });
        })
        .catch((err) => res.status(422).json(err));
    },
}