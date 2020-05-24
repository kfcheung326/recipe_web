const controller = require("../controllers/recipe.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

      // app.post("/api/recipeSearch", controller.searchRecipe);
    app.get("/api/recipeSearch", controller.searchRecipe);
    app.get("/api/recipe", controller.list);
    app.post("/api/recipe", controller.add);
    app.put("/api/recipe", controller.update);
    app.delete("/api/recipe",controller.delete);


};