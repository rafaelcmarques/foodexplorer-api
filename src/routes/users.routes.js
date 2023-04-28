const { Router } = require("express");
const UserController = require("../controllers/UserController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const userRouter = Router();

const userController = new UserController();

userRouter.post("/", userController.create);
userRouter.put("/", ensureAuthenticated, userController.update);

module.exports = userRouter;
