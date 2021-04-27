var express = require('express');
var router = express.Router();
var Alumni = require('../models/alumni');
var passport = require('passport');
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
password: req.body.password,
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

router.post('/login', function(req,res,next){
  passport.authenticate('local', function(err, user, info) {
    if (err) { return res.status(501).json(err); }
    if (!user) { return res.status(501).json(info); }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.status(200).json({message:'Login Success'});
    });
  })(req, res, next);
});

module.exports = router;
