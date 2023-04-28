const { Router } = require("express");

const userRouter = require("./users.routes");
const dishesRouter = require("./dishes.routes");
const ingredientsRoutes = require("./ingredients.routes");

const sessionsRoutes = require("./sessions.routes");

const adminDishesRoutes = require("./adminRoutes/adminDishes.routes");
const adminIngredientsRoutes = require("./adminRoutes/adminIngredients.routes");

const routes = Router();

routes.use("/users", userRouter);
routes.use("/dishes", dishesRouter);
routes.use("/sessions", sessionsRoutes);

routes.use("/ingredients", ingredientsRoutes);

routes.use("/admin/dishes", adminDishesRoutes);
routes.use("/admin/ingredients", adminIngredientsRoutes);

module.exports = routes;
