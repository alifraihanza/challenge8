require('dotenv').config()

const app = require("./app")
const { transporter, mailOption } = require('./mailer')
const PORT = 3000


app.listen(process.env.PORT || 3000, () => {
    console.log(`Berjalan di port ${PORT}`)
})

// app.get('/send', (req, res)=> {
//     transporter.sendMail(mailOption, (error, info)=> {
//         if(error){
//             console.log(error)
//             res.status.json({
//                 success:false,
//                 message: 'failed',
//                 data: error
//             })
//         }else{
//             console.log(info)
//             res.status(200).json({
//                 success:true,
//                 message: 'email sent',
//                 data: info.response
//             })
//         }
//       })
// })