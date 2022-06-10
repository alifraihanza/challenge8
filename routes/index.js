const express = require("express");
const router = express.Router();
const auth = require('../middleware/auth');
const passport = require('passport');
const path = require('path')
const multer = require('multer')
const morgan = require('morgan')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname === 'foto'){
            cb(null, './uploads/images')
        }else{
            cb(null, './uploads/videos')
        }
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    },
})
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'foto'){
            if (file.mimetype == 'image/jpeg'|| file.mimetype == 'image/jpg'|| file.mimetype == 'image/png') {
                cb(null, true);
              } else {
                cb(null, false);
                return cb(new Error('Only .png, .jpg and .jpeg format allowed'));
              }
            } else{
            if (file.mimetype == 'video/mp4' || file.mimetype == 'video/x-msvideo' || file.mimetype == 'video/quicktime') {
                cb(null, true);
              } else {
               cb(null, false);
               return cb(new Error('Only .mp4, .avi and .mov format allowed'));
             }
        }   
    },
});

//
const usergame = require("../controllers/user_gameController")
const usergamebiodata = require("../controllers/user_game_biodataController")
const usergamehistory = require("../controllers/user_game_historyController")
//views
const usergames = require("../controllers/user_gameViews")
const usergamesbiodata = require("../controllers/user_game_biodataViews")
const usergameshistory = require("../controllers/user_game_historyViews")

//home views
const home = require("../controllers/homeViews");
// router.get("/", home.index);
router.get("/home", home.index);

//views
const { registerPage, registerViews, lupaKatasandiPage, lupaKatasandiViews, verifikasiPage, verifikasiViews, gantiKatasandiPage, gantiKatasandiViews } = require('../controllers/auth_views');
//api
const { register, loginAPI, lupaKatasandi, verifikasi, gantiKatasandi } = require('../controllers/auth_api');
router.post('/api/register', register);
router.post('/api/loginAPI', loginAPI);
router.post('/api/lupaKatasandi', lupaKatasandi);
router.post('/api/verifikasi', verifikasi);
router.post('/api/gantiKatasandi', gantiKatasandi);

router.use(morgan('dev'))

//email
// router.get('/email', usergame.sendMail)


// api
router.get('/usergameapi',  auth, usergame.getAllApi)
router.get('/usergame/:id', auth, usergame.getId)
router.post('/usergameapi', auth, usergame.Post)
router.put('/usergameapi/:id', auth, usergame.Put)
router.delete('/usergame/:id', auth, usergame.Delete)

router.get('/usergamebiodataapi', auth, usergamebiodata.getAllApi)
router.get('/usergamebiodata/:id', auth, usergamebiodata.getId)
router.post('/usergamebiodataapi', auth, usergamebiodata.Post)
router.put('/usergamebiodataapi/:id', auth, usergamebiodata.Put)
router.delete('/usergamebiodata/:id', auth, usergamebiodata.Delete)

router.get('/usergamehistoryapi', auth, usergamehistory.getAllApi)
router.get('/usergamehistory/:id', auth, usergamehistory.getId)
router.post('/usergamehistoryapi', auth, upload.any(), usergamehistory.Post)
router.put('/usergamehistoryapi/:id', auth, upload.any(), usergamehistory.Put)
router.delete('/usergamehistory/:id', auth, usergamehistory.Delete)


function checkAuthenticated(req,res,next) {
    if(req.isAuthenticated()){
    return next()
    }
    res.redirect('./view/login')
}

function checkNotAuthenticated(req,res,next) {
    if(req.isAuthenticated()){
    return res.redirect('/view/usergames')
    }
    next()
}


//ViEWS
router.get('/view/usergames', checkAuthenticated, usergames.getAllViews)
router.get('/view/createusergames', checkAuthenticated, usergames.createFormPostViews)
router.get('/view/updateformusergames/:id', checkAuthenticated, usergames.getIdViews)
router.post('/view/createusergames', checkAuthenticated,usergames.PostViews)
router.post('/view/updateusergames/:id', checkAuthenticated, usergames.PutViews)
router.get('/view/deleteusergames/:id', checkAuthenticated, usergames.DeleteViews)

router.get('/view/usergamesbiodata', checkAuthenticated, usergamesbiodata.getAllViews)
router.get('/view/createusergamesbiodata', checkAuthenticated, usergamesbiodata.createFormPostViews)
router.get('/view/updateformusergamesbiodata/:id', checkAuthenticated, usergamesbiodata.getIdViews)
router.post('/view/createusergamesbiodata', checkAuthenticated, usergamesbiodata.PostViews)
router.post('/view/updateusergamesbiodata/:id', checkAuthenticated, usergamesbiodata.PutViews)
router.get('/view/deleteusergamesbiodata/:id', checkAuthenticated, usergamesbiodata.DeleteViews)

router.get('/view/usergameshistory', checkAuthenticated, usergameshistory.getAllViews)
router.get('/view/createusergameshistory', checkAuthenticated, usergameshistory.createFormPostViews)
router.get('/view/updateformusergameshistory/:id', checkAuthenticated, usergameshistory.getIdViews)
router.post('/view/createusergameshistory', checkAuthenticated, upload.any(), usergameshistory.PostViews)
router.post('/view/updateusergameshistory/:id', checkAuthenticated, upload.any(), usergameshistory.PutViews)
router.get('/view/deleteusergameshistory/:id', checkAuthenticated, usergameshistory.DeleteViews)



router.get('/view/lupaKatasandi', checkNotAuthenticated, lupaKatasandiPage)
router.post('/lupa', checkNotAuthenticated, lupaKatasandiViews)

router.get('/view/verifikasi', checkNotAuthenticated, verifikasiPage)
router.post('/verifikasi', checkNotAuthenticated, verifikasiViews)

router.get('/view/gantiKatasandi', checkNotAuthenticated, gantiKatasandiPage)
router.post('/ganti', checkNotAuthenticated, gantiKatasandiViews)

router.get('/view/register', checkNotAuthenticated, registerPage)
router.post('/register', checkNotAuthenticated, registerViews)

router.get('/view/login', checkNotAuthenticated, (req, res)=> {
    res.render('login')
})

router.post(
'/login', 
checkNotAuthenticated,
passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/view/login',
    failureFlash: true,
}))

router.get('/', (req, res)=> {
    res.redirect('/view/login')
})

router.get('/view/logout', (req, res)=> {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/view/login');
      });
})

router.all('*', (req,res)=> {
    res.redirect('/view/login')
})



module.exports = router;