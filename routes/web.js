const homeController=require('../app/http/controllers/homeControllers')
const authController=require('../app/http/controllers/authControllers')
const cartController=require('../app/http/controllers/customers/cartControllers')
const orderController=require('../app/http/controllers/customers/orderController')
// const AdminorderController=require('../app/http/controllers/admin/orderController')
const recipeController=require('../app/http/controllers/recipeControllers')
var session = require('express-session'); 
//middlewares
const guest =require('../app/http/middlewares/guest')
const auth =require('../app/http/middlewares/auth')
const admin =require('../app/http/middlewares/admin')

function initRoutes(app){

app.get('/',homeController().index)
app.get('/login',guest,authController().login)
app.post('/login',authController().postLogin)
app.get('/signup',guest,authController().signup)
app.post('/signup',authController().postsignup)
app.post('/logout',authController().logout)
app.get('/hotels',recipeController().index)


app.get('/cart',cartController().index)
app.post('/update-cart',cartController().update)
// //customer routes
app.post('/orders',auth,orderController().store)
app.get('/orders',auth,orderController().index)

//admin routes
// app.get('/adminorder',admin,AdminorderController().index)

}

module.exports=initRoutes