const mongoose=require('mongoose')
const Schema=mongoose.Schema
//class or contructor

const menuSchema=new Schema({
      name:{type:String, required:true},
      location:{type: String ,require:true},
      Description:{type:String,require:true},
      wifi:{type:String,require:true},
       rating:{type:Number,require:true},
       image:{type:String,require:true},
       price:{type:Number,require:true}
})

module.exports=mongoose.model('Recipe',menuSchema)

