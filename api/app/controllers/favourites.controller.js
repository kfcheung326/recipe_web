const config = require("../config/auth.config");
const db = require("../models");
const Favourites = db.favourite;

exports.list = (req,res) => {
    const user = req.query.userId;
    var condition = { userId : user };
    Favourites.find(condition).then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "can not get the fav."
        });
      });

};

exports.add = (req,res) => {
    const favourites = new Favourites({
        image: req.body.image,
        title: req.body.title,
        protein: req.body.protein,
        fat: req.body.fat,
        carbs: req.body.carbs,
        userId: req.body.userId
    });

    favourites.save(favourites).then(data => {
      res.send(data);

    }).catch(err => {
      res.status(500).send({
        message:
          err.message || "Can not create fav."
      });
    });
};

exports.delete = (req,res) => {
  const id = req.query.id;

  Favourites.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Fav with id=${id}. Maybe fav was not found!`
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
};