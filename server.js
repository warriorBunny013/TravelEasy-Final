
const dotenv = require("dotenv");
dotenv.config();
var express=require('express')
const app=express()

//layouts initialisation
const ejs=require('ejs')
const path=require('path')
const expressLayout=require('express-ejs-layouts')
const passport=require('passport')
const PORT=process.env.PORT || 2100
//process.env.PORT || 
app.listen(PORT,()=>{
    console.log(`Listening on port hello ${PORT}`)
 })
//mongo require
const mongoose=require('mongoose')
const flash=require('express-flash')
var session = require('express-session');
var MongoDBStore = require('connect-mongo');                                                                                                                        
const { urlencoded } = require("express");

const DB=process.env.MONGO_URL;

mongoose
  .connect(DB, {
    usenewurlparser: true,
    useunifiedtopology: true,
  })
  .then(() => {
    console.log(" DB Successfully connected ");
  })
  .catch((error) => {
    console.log(`can not connect to database, ${error}`);
  });


app.use(
    session({
    secret:"thisismysecret",
    resave: false,
    saveUninitialized:false,
    store:MongoDBStore.create({ mongoUrl:process.env.MONGO_URL}),
    cookie:{maxAge: 1000*60*60*24}
}))
//passport config
const passportInit=require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())


app.use(flash())

app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//global middleware
app.use((req,res,next)=>{
    res.locals.session=req.session
    res.locals.user=req.user
    next()
})

//set template engines
app.use(expressLayout)
app.set('views',path.join(__dirname,'/resources/views'))
app.set('view engine','ejs')
// mongoose.set('strictQuery', true);
app.use(express.static('public'));

require('./routes/web')(app)



