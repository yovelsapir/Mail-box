const express = require('express');
const router = express.Router();
const Email = require('../models/email.model');
const User = require('../models/user.model');
const jwt = require("jsonwebtoken");

router.get("/:token", function(req, res, next){ // Inbox
    const token = req.params.token;
    jwt.verify(token, "secret", function(err, decoded){
        if(err){
            return res.status(500).json({
                title: "Cannot decoded token.",
                error: err
            });
        } 
        Email.find({getter: decoded.user.email}, 
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

router.post("/compose", function(req, res, next){

    jwt.verify(req.body.token, "secret", function(err, decoded){
        if(err){
            return res.status(500).json({
                title: "Cant decoded token.",
                error: err
            });
        } 

        User.findOne({_id: decoded.user._id}, function(err, user){
            if(err){
                return res.status(500).json({
                    title: "User not found",
                    error: err
                });
            } 

            const date = new Date();
            
            const email = new Email({
                getter: req.body.getter,
                sender: decoded.user.email,
                sendername: decoded.user.username,
                date: date,
                subject: req.body.subject,
                message: req.body.message,
                category: "inbox",
                user: user
            });

            email.save(function(err, result){
                if(err){
                    return res.status(500).json({
                        title: 'ERROR: email cannot sent.',
                        error: err
                    });
                }
                res.status(200).json({
                    title: 'An email sent successfully',
                    obj: result
                });
            });
        });

    });

});

module.exports = router;

