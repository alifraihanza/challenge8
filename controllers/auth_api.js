/** @format */

const { user_game } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const { generateOTP } = require("../otp")
const salt = bcrypt.genSaltSync(10)
require('dotenv').config();

module.exports = {
  register: async (req, res) => {
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

      // Create token
      const token = jwt.sign({ id: user.id }, "holaa", {
        expiresIn: '15m',
      });


      const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth:{
              user: 'alifraihanzaa@gmail.com',
              pass: 'igcfjnjhdotxsczr'
          }
      })
      const mailOption = {
          
          to: email,
          subject: 'Selamat, Anda Berhasil Mendaftar',
          text: 'Berhasil register api'
      }
      module.exports = {transporter, mailOption}

      transporter.sendMail(mailOption, (error, info)=> {
          if(error){
              (error)
          }else{
              ('email sent : ' + info.response)
          }
      })
      // save user token
      user.token = token;

      // return new user
      res.status(200).json({ message: 'Berhasil Membuat User Game', result: user });
    } catch (err) {
      res.status(500).json({ message: 'Gagal Create User Game', err: err.message });
    }
    // Our register logic ends here
  },
  loginAPI: async (req, res) => {
    // Our loginAPI logic starts here
    try {
      // Get user input
      const { nama_pengguna, kata_sandi } = req.body;

      // Validate user input
      if (!(nama_pengguna && kata_sandi)) {
        res.status(400).send('All input is required');
      }
      // Validate if user exist in our database
      const user = await user_game.findOne({
        where: {
          nama_pengguna: nama_pengguna,
        },
      });

      if (user && kata_sandi) {
        // Create token
        const token = jwt.sign({ id: user.id, nama_pengguna, role_id: user.role_id}, "holaa", {
          expiresIn: '15m',
        });

        // save user token
        user.token = token;

        // user
        res.status(200).json(user);
      } else {
        res.status(400).send('nama pengguna atau kata sandi salah!');
      }
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  },





  lupaKatasandi: async(req, res) => {
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
            (error)
        }else{
            ('email sent : ' + info.response)
        }
    })

    return res.status(200).json({
      'message': 'Success OTP Send to Email',
      'otp': otp
    })
  },

  verifikasi: async (req, res) =>{
    let {email, otp} = req.body

    if(!email && !otp){
      return res.status(400).json({
        'message': 'Failed'
      })
    }

    let user = await user_game.findOne({where: {email: email }})

    if(!user?.nama_pengguna){
      return res.status(200).json({
        'message': 'Email not found'
      })
    }
    
    //console.log(user.otp)

    if(user.otp != otp){
      return res.status(200).json({
        'match': false,
        'message': 'Invalid OTP',
      })
    }

    await user_game.update({
      otp: null
    }, {
      where: {
        id: user.id
      }
    })

    return res.status(200).json({
      'match': true,
      'message': 'OTP Match',
      'id': user.id,
    })
  },

  gantiKatasandi: async (req, res) =>{
    let {id, kata_sandi} = req.body

    if(!id && !kata_sandi){
      return res.status(400).json({
        'message': 'Failed'
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

    return res.status(200).json({
      'success': true,
      'message': 'Ganti Kata Sandi',
    })
  }











};
