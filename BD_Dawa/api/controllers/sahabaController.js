const Sahaba = require("../models/sahaba");

exports.sahaba_get = (req, res, next) => {
  /*
  prénom: req.query.prénom | null,
    naissance: req.query.naissance,
    genre: req.query.genre,
    conversion: req.query.conversion,
    parenté: req.query.parenté,
    fonction: req.query.fonction,
    ethnie: req.query.ethnie,
    bataille: req.query.bataille,
    métier: req.query.métier,
    émigration: req.query.émigration,
    serment: req.query.serment,
    catégorie: req.query.catégorie,
    bienfait: req.query.bienfait,
    verset: req.query.verset  
  */ 
  //{ nom: { $all: req.query.nom } }
  var query = req.query
  if (req.query.parenté){
    query.parenté = { $all: req.query.parenté }
  }
  if (req.query.fonction){
    query.fonction = { $all: req.query.fonction }
  }
  if (req.query.bataille){
    query.bataille = { $all: req.query.bataille }
  }
  if (req.query.métier){
    query.métier = { $all: req.query.métier }
  }
  if (req.query.émigration){
    query.émigration = { $all: req.query.émigration }
  }
  if (req.query.serment){
    query.serment = { $all: req.query.serment }
  }
  if (req.query.bienfait){
    query.bienfait = { $all: req.query.bienfait }
  }
  console.log(req.query)
  console.log(query)
  
  Sahaba.find(query)
    .exec()
    .then((docs) => {
      const sahabas = {
        count: docs.length,
        sahabas: docs,
      };
      res.status(200).json(sahabas);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.sahaba_create = (req, res, next) => {
  const sahaba = new Sahaba(req.body);
  sahaba
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Sahaba ajouté !",
        createdSahaba: {
          nom: result.nom,
          prénom: result.prénom,
          request: {
            type: "GET",
            url: "https://locolhost:300/sahabas" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};


exports.sahaba_detail = (req, res, next) => {
  const id = req.params.id;
  Sahaba.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res
          .status(404)
          .json({ message: "No valid sahaba for the provided ID" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.sahaba_update = (req, res, next) => {
  const id = req.params.id;
  // we make a copy
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Sahaba.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Sahaba modifié !",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.sahaba_delete = (req, res, next) => {
  const id = req.params.id;
  Sahaba.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({ message: "Sahaba supprimé !" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};