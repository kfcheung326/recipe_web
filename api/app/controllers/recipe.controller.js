const request = require('request')
const db = require("../models");
const Recipe = db.recipe;

exports.searchRecipe = (req, res) => {
    const keyword = req.query.q;
    
    const url = `https://api.edamam.com/search?q=${keyword}&app_id=606771c8&app_key=11548eb464570a15a94c5ead80aa35a3&from=0&to=1`
    
    request.get(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            const recipes = []
            const results = JSON.parse(body).hits

            for (let i = 0; i < results.length; i++) {
                const recipe = {
                    image:          results[i].recipe.image,
                    qty:            results[i].recipe.yield,
                    title:          results[i].recipe.label,
                    energy:         results[i].recipe.totalNutrients.ENRC_KCAL,
                    protein:    	results[i].recipe.totalNutrients.PROCNT,
                    fat:	    	results[i].recipe.totalNutrients.FAT,
                    carbs:		    results[i].recipe.totalNutrients.CHOCDF,
                    ingredientLines: results[i].recipe.ingredientLines
                   
                }

                recipes.push(recipe)
				
            }
            console.log(recipes)
            console.log('q = '+keyword);
            // res.status(200).send("recipes Content.");
            res.status(200).send(recipes);

            
            //return callback(null, recipes)
        } else {
            return callback({message: 'Problem with  API query.', error: error, statusCode: response.statusCode})
        }
    })
    // res.status(200).send("recipes Content.");

};

// add recipe to db
exports.add = (req, res) => {

    const recipes = new Recipe({
        image:  req.body.image,
        title:  req.body.title,
        qty:    req.body.qty,
        protein: req.body.protein,
        fat: req.body.fat,
        carbs: req.body.carbs,
        ingredientLines: req.body.ingredientLines,
        username: req.body.username
    });

    recipes.save(recipes).then(data => {
        res.send(data);
  
      }).catch(err => {
        res.status(500).send({
          message:
            err.message || "Can not create recipe."
        });
      });

};

//update the existing recipe to db
exports.update =  (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
      const id = req.params.id;
    
      Recipe.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update Recipe with id=${id}. Maybe Tutorial was not found!`
            });
          } else res.send({ message: "Recipe was updated successfully." });
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Recipe with id=" + id
          });
        });
};

//delete existing recipe
exports.delete = (req,res) => {
  const id = req.params.id;

  Recipe.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Fav with id=${id}. Maybe Tutorial was not found!`
        });
      } else {
        res.send({
          message: "Fav was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Fav with id=" + id
      });
    });
    res.send("no problem");
};

exports.list = (req,res) => {
  //const user = req.query.userId;
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  // var condition = { userId : user };

    Recipe.find(condition).then(data => {
        res.status(200).send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "can not get the recipe."
        });
      });
      // res.send("no problem");
};
