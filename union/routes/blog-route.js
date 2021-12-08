const express = require('express');
// const Alumni = require('../models/alumni');
// const checkAuth = require('../middleware/check-auth');
const Blog = require('../models/blog');
const checkAdmin = require('../middleware/check-admin');
const router = express.Router();

router.get('/fetch', function(req, res, next) {
    Blog.find()
        .then(async blog => {

            if (!blog) {
                return res.status(401).json({
                    message: 'User not present'
                });
            }
            return res.status(200).json(blog)
        })

});
router.put('/DeleteBlog', checkAdmin, async(req, res, next) => {
    const _id = req.body._id;
    console.log(_id)
    try {
        const notAlumni = await Blog.findByIdAndRemove(_id);
        if (!notAlumni) return res.sendStatus(404);
        return res.send(notAlumni);
    } catch (e) {
        return res.sendStatus(400);
    }
});

module.exports = router;