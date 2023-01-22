const Recipe=require('../../models/menu')
 
function recipeController(){

    return{
        async index(req,res){

            //using async aswait
            const recipes=await Recipe.find()
            console.log(recipes)
            return res.render('recipes',{recipes:recipes})
    }
}
}
module.exports=recipeController