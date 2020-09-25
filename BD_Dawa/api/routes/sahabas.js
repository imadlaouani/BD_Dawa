const express = require("express");
const router = express.Router();
const {requireAuth} = require("../middleware/check-auth")

const SahabaController = require("../controllers/sahabaController");


// get all sahaba
router.get("/", SahabaController.sahaba_get);

// Create a sahaba ne pas oublier de se connecter
router.post("/" ,SahabaController.sahaba_create)

// Detail on specific sahaba with id
router.get("/:id", SahabaController.sahaba_detail);

//Update, modify a sahaba
router.patch("/:id",SahabaController.sahaba_update);

//Delete a sahaba
router.delete("/:id",SahabaController.sahaba_delete);

module.exports = router;
