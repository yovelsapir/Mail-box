const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

var User = require('../models/user.model');

router.post('/', function(req, res, next){
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        level: req.body.level
    });

    user.save(function(err, result){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }   
        res.status(201).json({
            message: 'User created',
            obj: result
        });
    });
});


router.post('/signin', function(req, res, next){
    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if(!user){
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            }); 
        }
        
        if(!bcrypt.compareSync(req.body.password, user.password)){
            return res.status(401).json({
                title: 'Login failed',
                error: {message: 'Invalid login credentials'}
            }); 
        }
                 
        var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
        
        res.status(200).json({
            title: 'Login Successful',
            userId: user._id,
            username: user.username,
            token: token,
            decoded: jwt.verify(token, 'secret')
        });
    });
});

module.exports = router;