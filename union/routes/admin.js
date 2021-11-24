const express = require('express');
var bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Alumni = require('../models/alumni');
const checkAuth = require('../middleware/check-auth');
const router = express.Router();

router.post("/login", (req, res, next) => {
    console.log(req.body.passcode);
    let passcode = '123123'
    console.log(passcode)
    const com = bcrypt.compareSync(req.body.passcode, passcode)
    try {

        console.log(com)
        if (com) {
            const token = jwt.sign("I can be anything", "secret_this_should_be_longer", );
            res.status(200).json({
                message: 'Congrats!',
                token: token
            });
        } else {
            return res.status(401).json({
                message: 'Wrong Password'
            });
        }
    } catch (err) {
        return res.status(401).json({
            message: "Auth Failed3"
        })
    }

    // .catch((err) => {
    //     console.log(err)
    //     return res.status(401).json({
    //         message: "Auth Failed3"
    //     })
    // })
});

router.put('/verified', function(req, res, next) {
    console.log("working")
    console.log(req.body._id)

    Alumni.findByIdAndUpdate(req.body._id, {
        verified: true,
    }).then(alumni => {
        return res.status(200).json(alumni);
    });
});
router.put('/DeleteProfle', async(req, res, next) => {
    const _id = req.body._id;
    console.log(_id)
    try {
        const notAlumni = await Alumni.findByIdAndRemove(_id);
        if (!notAlumni) return res.sendStatus(404);
        return res.send(notAlumni);
    } catch (e) {
        return res.sendStatus(400);
    }
})
module.exports = router;