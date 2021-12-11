const express = require('express');
const multer = require("multer");
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Alumni = require('../models/alumni');
const checkAuth = require('../middleware/check-auth');
const Blog = require('../models/blog');
const events = require('../models/events');
const checkAdmin = require('../middleware/check-admin');
// const checkAdmin = require('../middleware/check-admin');
const router = express.Router();

const MINE_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MINE_TYPE[file.mimetype];
        let error = new Error("Invalid File FOrmat");
        if (isValid) {
            error = null;
        }
        cb(error, "public/images");
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const ext = MINE_TYPE[file.mimetype];
        cb(null, name + '-' + Date.now() + '.' + ext);
    }
})


//image upload backend


router.post('/register', multer({ storage: storage }).single("photo"), function(req, res, next) {
    addtodb(req, res)
})

async function addtodb(req, res) {
    var alumni = new Alumni({
        fname: req.body.fname,
        lname: req.body.lname,
        roll: req.body.roll,
        phone: req.body.phone,
        gyear: req.body.gyear,
        email: req.body.email,
        course: req.body.course,
        branch: req.body.branch,
        photo: req.body.photo,
        verified: false,
        password: Alumni.hash(req.body.password),
        creationDate: Date.now(),
        bio: ""
    });
    try {
        doc = await alumni.save();
        return res.status(201).json(doc);
    } catch (err) {
        console.log(res.json(err));
        return res.status(501).json(err);
    }
}
//login route using JWT authentication

router.get('/AlumniById/:id', (req, res) => {
    console.log(req.params.id)
    Alumni.findById(req.params.id)
        .then(async alumni => {

            if (!alumni) {
                return res.status(401).json({
                    message: 'User not present'
                });
            }
            return res.status(200).json(alumni)
        })

});

router.post("/login", (req, res, next) => {
    // console.log(req.body);
    let fetchedUser
    Alumni.findOne({ email: req.body.email })

    .then(async alumni => {

            if (!alumni) {
                return res.status(401).json({
                    message: 'User not present'
                });
            }
            fetchedUser = alumni;
            if (!fetchedUser.verified) {
                return res.status(401).json({
                    message: 'Not Yet Verified By Admin'
                });
            }
            const result = await bcrypt.compareSync(req.body.password, alumni.password)
            return result
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: 'Wrong Password'
                });
            }
            
            const token = jwt.sign({ fetchedUser }, "secret_this_should_be_longer", { expiresIn: "2h" });
            // const decoded = jwt.verify(token, "secret_this_should_be_longer");  
            // var userId = decoded.fetchedUser._id  
            // console.log(userId)  
            res.status(200).json({
                token: token,
                expiresIn: 7200
            });
        })

    .catch((err) => {
        console.log(err)
        return res.status(401).json({
            message: "Auth Failed3"
        })
    })
});


router.get('/alumni', checkAuth, function(req, res, next) {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret_this_should_be_longer");
    var userId = decoded.fetchedUser
    return res.status(200).json(userId);
});


//PUT requests
//( edit profile )
router.put('/user/profile', function(req, res, next) {
    console.log("working")
    console.log(req.body._id)
    Alumni.findByIdAndUpdate(req.body._id, {
        experienceList: req.body.experienceList,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        bio: req.body.bio
    }).then(alumni => {
        res.json(alumni);
    });

});


//BLOG starts

router.post('/blog', multer({ storage: storage }).single('image'), async function(req, res, next) {
    // console.log(req.body);
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "secret_this_should_be_longer");
    const imgurl = req.protocol + '://' + req.get("host");
    if(req.body.filename)
    {
       var blog = new Blog({
        tblog: req.body.tblog,
        blog: req.body.blog,
        imageURL: imgurl + "/public/images/" + req.file.filename,
        id: decoded.fetchedUser._id,
        fname: decoded.fetchedUser.fname,
        lname: decoded.fetchedUser.lname,
        creationDate: Date.now()
    }); 
    }
    else{
        var blog = new Blog({
            tblog: req.body.tblog,
            blog: req.body.blog,
            id: decoded.fetchedUser._id,
            fname: decoded.fetchedUser.fname,
            lname: decoded.fetchedUser.lname,
            creationDate: Date.now()
        }); 
    }
    try {
        doc = await blog.save();
        return res.status(201).json(doc);
    } catch (err) {
        return res.status(501).json(err);
    }
});

// blogs

router.get('/search-alumni', function(req, res, next) {
    Alumni.find()
        .then(async alumni => {

            if (!alumni) {
                return res.status(401).json({
                    message: 'User not present'
                });
            }
            return res.status(200).json(alumni)
        })

});
//events
router.post('/EventPost', checkAdmin, async function(req, res, next) {
    console.log(req.body);
    var event = new events({
        etitle: req.body.etitle,
        eDiscription: req.body.eDiscription,
        edate: req.body.date,
        creationDate: Date.now()
    });
    try {
        doc = await event.save();
        return res.status(201).json(doc);
    } catch (err) {
        return res.status(501).json(err);
    }
});
router.get('/AllEvents', function(req, res, next) {
    events.find()
        .then(async event => {

            if (!event) {
                return res.status(401).json({
                    message: 'User not present'
                });
            }
            return res.status(200).json(event)
        })

});
module.exports = router;