const Sahaba = require("../models/sahaba");

exports.sahaba_get = (req, res, next) => {
  Sahaba.find(req.query)
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
