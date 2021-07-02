const express = require('express');
const multer = require("multer");
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Alumni = require('../models/alumni');
const checkAuth = require('../middleware/check-auth');
const Blog = require('../models/blog');
const router = express.Router();

const MINE_TYPE ={
  'image/png':'png',
  'image/jpeg':'jpg',
  'image/jpg':'jpg'
};

const storage = multer.diskStorage({
  destination: (req , file , cb) =>{
    const isValid = MINE_TYPE[file.mimetype];
    let error = new Error("Invalid File FOrmat");
    if(isValid){
      error = null;
    }
    cb(error , "public/images");
  },
  filename: (req , file , cb) =>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MINE_TYPE[file.mimetype];
    cb(null , name+'-'+Date.now()+'.'+ ext);
  }
})


//image upload backend


router.post('/register' , multer({storage: storage}).single("photo"), function(req,res,next){
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
  photo: req.body.photo,
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


router.post("/login", (req,res,next) => {
  // console.log(req.body);
  let fetchedUser
  Alumni.findOne({email: req.body.email})

  .then(async alumni => {
     
    if(!alumni){ 
      return res.status(401).json({
        message: 'User not present'
      });
    }
    fetchedUser= alumni;
    
    const result =await bcrypt.compareSync(req.body.password,alumni.password)
   
    return result
  })
  .then(result => {
    if (!result) {
      return res.status(401).json({
        message: 'Wrong Password'
      });
    }
     const token = jwt.sign(
       {fetchedUser}, "secret_this_should_be_longer", {expiresIn: "2h" }
      );
      // const decoded = jwt.verify(token, "secret_this_should_be_longer");  
      // var userId = decoded.fetchedUser._id  
      // console.log(userId)  
      res.status(200).json({
        token: token,
        expiresIn: 7200 
      });
  })
  
  .catch((err)=>{
    console.log(err)
    return res.status(401).json({
      message:"Auth Failed3"
    })
  })
});


router.get('/alumni',checkAuth, function(req,res,next)
{
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "secret_this_should_be_longer");  
      var userId = decoded.fetchedUser 
   return res.status(200).json(userId);
});

//EDIT PROFILE


  
//PUT request ( edit profile )
router.put('/user/profile', function(req,res,next)
{
  console.log("working")
  console.log(req.body._id)
  // console.log(id)
  Alumni.findByIdAndUpdate(req.body._id, {
    experienceList: req.body.experienceList,
    country: req.body.country,
    state: req.body.state,
    city: req.body.city
   }).then(alumni => {
    res.json(alumni);
   });
   
  //  , (error, data) => {
  // if (error) {
  //   console.log(error)
  //   return next(error);
  // } else {
  //   res.json(data)
  //   console.log('Profile updated successfully!')
  // }
//  })
});



//BLOG starts

router.post('/blog' ,multer({storage:storage}).single('image') , async function(req,res,next){
  // console.log(req.body);
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, "secret_this_should_be_longer");
  const imgurl = req.protocol + '://' + req.get("host");
  var blog = new Blog({
  tblog:req.body.tblog,
  blog:req.body.blog,
  imageURL: imgurl + "/public/images/" + req.file.filename,
  id:decoded.fetchedUser._id,
  fname:decoded.fetchedUser.fname,
  lname:decoded.fetchedUser.lname,
  creationDate: Date.now()
  });
  try{
    doc =await blog.save();
    return res.status(201).json(doc);
  }
  catch(err)
  {
    return res.status(501).json(err);
  }
  });
  

  router.get('/fetch', function(req,res,next)
  {
    Blog.find()
    .then(async blog => {
       
      if(!blog){ 
        return res.status(401).json({
          message: 'User not present'
        });
      }
      return res.status(200).json(blog)
    })
   
  });
  router.get('/search-alumni', function(req,res,next)
  {
    Alumni.find()
    .then(async alumni => {
       
      if(!alumni){ 
        return res.status(401).json({
          message: 'User not present'
        });
      }
      return res.status(200).json(alumni)
    })
   
  });


module.exports = router;
