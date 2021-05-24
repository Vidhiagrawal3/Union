const express = require('express');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Alumni = require('../models/alumni');
const checkAuth = require('../middleware/check-auth');

const router = express.Router();
// var passport = require('passport');
// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.post('/register' , function(req,res,next){
  addtodb(req,res)
  })
  
  async function addtodb(req,res){
  var alumni = new Alumni({
  fname : req.body.fname,
  lname : req.body.lname,
  roll : req.body.roll,
  phone : req.body.phone,
  gyear : req.body.gyear,
  email: req.body.email,
  course: req.body.course,
  branch: req.body.branch,
  password: Alumni.hash(req.body.password),
  creationDate: Date.now()
  });
  try{
    doc =await alumni.save();
    return res.status(201).json(doc);
  }
  catch(err)
  {
    return res.status(501).json(err);
  }
  }
//login route using JWT authentication
// router.post("/login", function (req,res,next) {
//   UserCheck(req,res);
//   })
  
//   async function UserCheck(req,res){
//     let fetched = Alumni.findOne(req.body.email)
//     const result =await bcrypt.compare(req.body.password,fetched.password)
//       console.log(result)
  
//   try{
//     const token = jwt.sign(
//       {email: fetchedUser.email, userId: fetchedUser._id}, "secret_this_should_be_longer", {expiresIn: "2h" }
//      );
//      return res.status(200).json({
//        token: token
//      });
//   }
//   catch(err){
//      res.status(501).json(err);
//       }
//       process.on('unhandledRejection', (reason, promise) => {
//         console.log(reason);
//         console.log(promise);
//       });
//     }
router.post("/login", (req,res,next) => {
  console.log(req.body);
  let fetchedUser
  Alumni.findOne({email: req.body.email})

  .then(async alumni => {
     
    if(!alumni){ 
      return res.status(401).json({
        message: 'User not present'
      });
    }
    fetchedUser= alumni;
    console.log(alumni)
    const result =await bcrypt.compareSync(req.body.password,alumni.password)
    console.log(result)
    // console.log("jagfg")
    return result
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: 'Wrong Password'
      });
    }
     const token = jwt.sign(
       {email: fetchedUser.email, userId: fetchedUser._id}, "secret_this_should_be_longer", {expiresIn: "2h" }
      );
      res.status(200).json({
        token: token
      });
  })
  .catch((err)=>{
    console.log(err)
    return res.status(401).json({
      message:"Auth Failed3"
    })
  })
});


// async function addtodb(req,res){
// var alumni = new Alumni({
// fname : req.body.fname,
// lname : req.body.lname,
// roll : req.body.roll,
// phone : req.body.phone,
// gyear : req.body.gyear,
// email: req.body.email,
// course: req.body.course,
// branch: req.body.branch,
// password: Alumni.hash(req.body.password),
// creationDate: Date.now()
// });
// try{
//   doc =await alumni.save();
//   return res.status(201).json(doc);
// }
// catch(err)
// {
//   return res.status(501).json(err);
// }
// }

// router.post('/login', function(req,res,next){
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return res.status(501).json(err); }
//     if (!user) { return res.status(501).json(info); }
//     req.logIn(user, function(err) {
//       if (err) { return res.status(501).json(err); }
      
//       return res.status(200).json({message:'Login Success'});
//     });
//   })(req, res, next);
// });

router.get('/alumni',checkAuth, function(req,res,next)
{
   return res.status(200).json(req.user);
});

// router.get('/logout',isValidAlumni , function(req,res,next){
//   req.logOut();
//   return res.status(200).json({message:'Logout Success'});
// });
// function isValidAlumni(req,res,next){
//   if(req.isAuthenticated()){
//     //req.isAuthenticated() will return true if user is logged in
//     return next();
// } else{
//    return res.status(401).json({message:'Unauthorise request'});
// }
// }
module.exports = router;
