const Router = require("express");
const AdminDishesController = require("../../controllers/adminControllers/AdminDishesController");
const AdminDishesImageController = require("../../controllers/adminControllers/AdminDishesImageController");
const ensureAuthenticated = require("../../middlewares/ensureAuthenticated");

const multer = require("multer");
const uploadConfig = require("../../configs/upload");

const adminDishesController = new AdminDishesController();
const adminDishesImageController = new AdminDishesImageController();

const adminDishesRoutes = Router();
const upload = multer(uploadConfig.MULTER);

adminDishesRoutes.use(ensureAuthenticated);

adminDishesRoutes.post("/", adminDishesController.create);
adminDishesRoutes.get("/", adminDishesController.index);
adminDishesRoutes.get("/:id", adminDishesController.show);
adminDishesRoutes.patch("/:id", adminDishesController.update);
adminDishesRoutes.delete("/:id", adminDishesController.delete);
adminDishesRoutes.patch(
  "/:id/image",
  upload.single("image"),
  adminDishesImageController.update
);

module.exports = adminDishesRoutes;
