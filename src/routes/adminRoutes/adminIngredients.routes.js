const Router = require("express");
const AdminIngredientsController = require("../../controllers/adminControllers/AdminIngredientsController");
const ensureAuthenticated = require("../../middlewares/ensureAuthenticated");

const adminIngredientsController = new AdminIngredientsController();

const adminIngredientsRoutes = Router();

adminIngredientsRoutes.get(
  "/",
  ensureAuthenticated,
  adminIngredientsController.index
);

module.exports = adminIngredientsRoutes;
