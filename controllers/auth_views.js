/** @format */

const express = require('express');
const app = express();
const { user_game } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateOTP } = require("../otp")
const salt = bcrypt.genSaltSync(10)
const nodemailer = require('nodemailer')
require('dotenv').config();

module.exports = {
  registerPage: (req, res) => {
    res.render('register');
  },
  // registerViews: async (req, res) => {
  //   const hashedPassword = await bcrypt.hash(req.body.kata_sandi, 10);
  //   user_game.create({
  //     nama_pengguna: req.body.nama_pengguna,
  //     email: req.body.email,
  //     kata_sandi: hashedPassword,
  //     role_id: req.body.role_id
  //   })
  //     .then((user) => {
  //       res.redirect('/view/login');
  //     })
  //     .catch((err) => {
  //       res.redirect('/view/register');
  //     });
  // },
  registerViews: async (req, res) => {
    // Our register logic starts here
    try {
      // Get user input
      const hashedPassword = await bcrypt.hash(req.body.kata_sandi, 10);
      const { nama_pengguna, email, role_id } = req.body;


      // Create user in our database
      const user = await user_game.create({
        nama_pengguna,
        email,
        kata_sandi: hashedPassword,
        role_id
      });


      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth:{
              user: 'alifraihanzaa@gmail.com',
              pass: 'igcfjnjhdotxsczr'
          }
      })
      const mailOption = {
          from: 'alifraihanzaa@gmail.com',
          to: email,
          subject: 'Selamat, Anda Berhasil Mendaftar',
          text: 'Berhasil register views'
      }
      module.exports = {transporter, mailOption}

      transporter.sendMail(mailOption, (error, info)=> {
          if(error){
              console.log(error)
          }else{
              ('email sent : ' + info.response)
          }
      })

      // return new user
      res.redirect('/view/login');
    } catch (err) {
      res.redirect('/view/register');
    }
    // Our register logic ends here
  },





  


  lupaKatasandiPage: (req, res) => {
    res.render('lupa');
  },
  lupaKatasandiViews: async(req, res) => {
    let {email} = req.body

    if(!email){
      return res.status(400).json({
        'message': 'Failed'
      })
    }
    let user = await user_game.findOne({where: {email: email }})

    if(!user?.email){
      return res.status(200).json({
        'message': 'Email not found'
      })
    }
  
    let otp = generateOTP(4)

    await user_game.update({
      otp: otp
    }, {
      where: {
        id: user.id
      }
    })

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth:{
          user: 'alifraihanzaa@gmail.com',
          pass: 'igcfjnjhdotxsczr'
      }
    })
    const mailOption = {
      to: email,
      subject: 'Lupa Kata Sadi',
      text: `OTP untuk ganti Katasandi: ${otp}`,
      html: `<h1>OTP untuk ganti Katasandi: ${otp}</h1>`
    }
    module.exports = {transporter, mailOption}

    transporter.sendMail(mailOption, (error, info)=> {
        if(error){
            console.log(error)
        }else{
            ('email sent : ' + info.response)
        }
    })

    res.redirect('/view/verifikasi');
  },

  
  verifikasiPage: (req, res) => {
    res.render('verifikasi');
  },
  verifikasiViews: async (req, res) =>{
    let {email, otp} = req.body

    if(!email && !otp){
      return res.status(400).json({
        'message': 'Failed'
      })
    }

    let user = await user_game.findOne({where: {email: email }})

    if(!user?.nama_pengguna){
      return res.redirect('/view/verifikasi')
    }
    
    //console.log(user.otp)

    if(user.otp != otp){
      return res.redirect('/view/verifikasi')
    }

    await user_game.update({
      otp: null
    }, {
      where: {
        id: user.id
      }
    })

    res.redirect('/view/gantiKatasandi');
  },

  
  gantiKatasandiPage: (req, res) => {
    res.render('ganti');
  },
  gantiKatasandiViews: async (req, res) =>{
    let {id, kata_sandi} = req.body

    if(!id && !kata_sandi){
      return res.status(400).json({
        'message': 'Gagal'
      })
    }

    let user = await user_game.findOne({where: {id: id }})

    if(!user?.nama_pengguna){
      return res.status(200).json({
        'message': 'User tidak ditemukan'
      })
    }
    
    await user_game.update({
      kata_sandi: bcrypt.hashSync(kata_sandi, salt)
    }, {
      where: {
        id: user.id
      }
    })

    res.redirect('/view/login');
  }











};