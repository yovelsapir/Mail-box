const express = require('express');
const router = express.Router();
const bycrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require('../models/user.model');
const Email = require('../models/email.model');

router.get("/sent/:token", function(req, res, next){ // sent mails
    const token = req.params.token;
    jwt.verify(token, "secret", function(err, decoded){
        if(err){
            return res.status(500).json({
                title: "Cannot decoded token.",
                token: token,
                error: err
            });
        } 
        Email.find({sender: decoded.user.email}, 
                   function(err, emails){
            if(err){
                return res.status(500).json({
                    title: 'ERROR: email cannot sent.',
                    error: err
                });
            }

            res.status(200).json({
                title: 'An email object has get successfully',
                obj: emails
            });
        });
    });
});

router.post("/", function(req, res, next){
    const result = {
        token: req.body.token
    }

    jwt.verify(result.token, "secret", function(err, decoded){
        if(err){
            return res.status(500).json({
                title: "An error occurred",
                message: "You must have login to navigate this path!",
            });
        }

        User.findOne({_id: decoded.user._id}, function(err, user){
            if(err){
                return res.status(500).json({
                    title: "User not found",
                    message: "Your user not found in the database.",
                });
            } 
            res.status(200).json({
                title: "Navigation Successed!",
                message: "You are logged to the system!",
                username: user.username,
                email: user.email
            });
        });
    });
});

module.exports = router;