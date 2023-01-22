const nodemailer = require("nodemailer");
const bodyparser = require('body-parser');
const Mail = require('nodemailer/lib/mailer');
const User=require('../../models/user')
const bcrypt=require('bcrypt')
const passport = require('passport')
var session = require('express-session');
const sendEmail=require('../../models/sendemail')

function authController(){

    return{
        login(req,res){
            res.render('auth/login')
        },
        postLogin(req,res,next){
             passport.authenticate('local',(err,user,info)=>{

               if(err){
                req.flash('error',info.message)
                return next(err)
               }
               if(!user){
                 req.flash('error',info.message)
                 return res.redirect('/login')
               }
               req.logIn(user,(err)=>{
                if(err){
                    req.flash('error', info.message)
                    return next(err)
                }
                return res.redirect('/')
                
               })
             })(req,res,next)
        },
        signup(req,res){
            res.render('auth/signup')
        },
        async postsignup(req,res){
            const {name,email,password}=req.body
            //request validate
            if(!name|| !email||!password){
                req.flash('error','All fields are required')

                //return data in input field
                req.flash('name',name)
                req.flash('email',email) 

                return res.redirect('/signup')
            }
            //check if email exists
            User.exists({email: email},(err,result)=>{
               if(result){
                req.flash('error','Email Already exists')
                req.flash('name',name)
                req.flash('email',email)
                return res.redirect('/signup') 
               
               }
            })
            //hash password
            const hashedPassword=await bcrypt.hash(password,10)
            //create a user and store it in database
            const user=new User({
                name,
                email,
                password:hashedPassword
            })
            user.save().then((user)=>{
                //registration completed
                //login
                
               sendEmail({
                from:"mona23sonai@gmail.com",
                to:user.email,
                subject:"Thanks for registering",
                html:`<div>
                <h1>Thanks ${user.name} for registering in TravelEasy</h1>
            
                <p>Please visit our webpage for moew 😎😍</p>
            </div>`
               })

    return res.redirect('/')

            }).catch(err=>{
                req.flash('error','Something went wrong')
                
                return res.redirect('/signup');

            })

        },
        logout(req,res,next){
            req.logout(function(err){
               if(err){ return next(err)}
            //    req.logout()
               return res.redirect('/login')
            })
           
        }
    }

}

module.exports=authController