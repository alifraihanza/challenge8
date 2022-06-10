const { user_game } = require("../models");
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

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
        user_game.findAll()
        .then((usergame) => {
            //pakai ini untuk swagger
            res.status(200).json({ message: "Success", usergame }) 
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
        user_game.findOne({ where: { id: req.params.id } })
        .then((usergame) => {
            // if (role.role_id != 1) {
            //     if(usergame.id == role.id){
            //           res.status(200).json({
            //           success: `Success find user game`,
            //           data: usergame,
            //         });
            //       }
            // }
            if (usergame) {
                res.status(200).json({ message: "Success", usergame })
              } else {
                res.status(404).json({ message: 'User Game Tidak di temukan', usergame });
              }
        console.log(req.params.id, usergame)
        })
        .catch((error) => res.status(422).json({ message: "Error get data", error })
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
        user_game.create({
            nama_pengguna: req.body.nama_pengguna,
            email: req.body.email,
            kata_sandi: req.body.kata_sandi,
            role_id: req.body.role_id,
        })
            .then((usergame) => {
            res.status(201).json({ message: "Success menambahkan data", usergame })
        })
            .catch((err) => res.status(422).json("Can't create usergame"))
    },
    Put: (req, res) => {
    const { nama_pengguna, email, kata_sandi, role_id } = req.body
    const token = req.body.token || req.query.token || req.headers['authorization'];
        const role  = jwt.decode(token);
        console.log(role)
        if (role.role_id != 1 && req.params.id != role.id) {
            return res.status(401).json({
                'message': 'Unauthorized! You are not allowed to access this page'
            })
        }
        console.log("WAW" ,req.params.id)
    user_game.update(
        {
            nama_pengguna,
            email,
            kata_sandi,
            role_id,
        },
        {
            where: { id: req.params.id},
        })
        .then((usergame) => {
            res.status(201).json({ message: "Success", usergame })
          })
        .catch((err) => res.status(422).json(err))
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
        user_game.destroy({ where: { id: req.params.id } })
        .then((usergame) => {
            res.status(200).json({ message: "usergame dihapus", usergame })
        })
        .catch((err) => res.status(422).json(err))
    },
    
    // sendMail: async(req, res)=> {
    //     try{
    //         const transporter = nodemailer.createTransport({
    //             service: 'gmail',
    //             auth: {
    //                 user: 'alifraihanzaa@gmail.com',
    //                 pass: 'igcfjnjhdotxsczr'
    //             }
    //         })
    //         const mailOption = {
    //             from: 'alifraihanzaa@gmail.com',
    //             to: 'alifraihanzaa@gmail.com',
    //             subject: 'testing mailer 1',
    //             text: 'testing bro'
    //         }
    //         transporter.sendMail(mailOption, (error, info)=> {
    //             if(error){
    //                 console.log(error)
    //             }else{
    //                 console.log(info)
    //             }
    //         })
    //     }catch(error){
    //         console.log(error)
    //     }
    // }
}