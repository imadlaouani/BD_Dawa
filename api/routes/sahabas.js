const express = require("express");
const { Router } = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");
const upload = multer({ dest: "uploads" });

const Sahaba = require("../models/sahaba");
const chekAuth = require("../middleware/check-auth");
const checkAuth = require("../middleware/check-auth");

const SahabaController = require("../controllers/sahabaController");
// get all sahaba
router.get("/", SahabaController.sahaba_get);

// Create a sahaba
router.post("/", upload.single("image"), checkAuth, (req, res, next) => {
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
});

// Detail on specific sahaba with id
router.get("/:id", (req, res, next) => {
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
});

//Update, modify a sahaba
router.patch("/:id", (req, res, next) => {
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
});

//Delete a sahaba
router.delete("/:id", (req, res, next) => {
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
});

module.exports = router;
