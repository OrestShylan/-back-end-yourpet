const express = require("express");

const ctrl = require("../../controllers/pet");

const {
  validateBody,
  isValidId,
  uploadCloud,
  authenticate,
} = require("../../middleWares");

const { addPetJoiSchema } = require("../../models/petsModel");

const router = express.Router();

router.get("/", authenticate, ctrl.getAllPets);

router.post(
  "/",
  authenticate,
  validateBody(addPetJoiSchema),
  uploadCloud.single("pets-photo"),
  ctrl.addPet
);

router.delete("/:id", authenticate, isValidId, ctrl.deletePet);

module.exports = router;
