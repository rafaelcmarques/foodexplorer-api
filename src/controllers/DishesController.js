const knex = require("../database/knex");

class DishesController {
  async show(request, response) {
    const { id } = request.params;
    const dishe = await knex("dishes").where({ id }).first();

    const ingredients = await knex("ingredients")
      .where({ dishe_id: id })
      .orderBy("name");

    return response.json({ ...dishe, ingredients });
  }

  async index(request, response) {
    const { name, ingredients } = request.query;

    let dishes;

    if (ingredients) {
      const filterIngredients = ingredients
        .split(",")
        .map((ingredients) => ingredients.trim());

      dishes = await knex("ingredients")
        .select([
          "dishes.id",
          "dishes.name",
          "dishes.user_id",
          "dishes.category",
          "dishes.price",
          "dishes.description",
          "dishes.image",
        ])
        .whereLike("dishes.name", `%${name}%`)
        .whereIn("ingredients.name", filterIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dishe_id");
    } else {
      dishes = await knex("dishes")
        .whereLike("name", `%${name}%`)
        .orderBy("name");
    }

    const userIngredients = await knex("ingredients");

    const dishesWithIngredients = dishes.map((dishe) => {
      const dishesIngredients = userIngredients.filter(
        (ingredient) => ingredient.dishe_id === dishe.id
      );
      return {
        ...dishe,
        ingredients: dishesIngredients,
      };
    });

    return response.json(dishesWithIngredients);
  }
}
module.exports = DishesController;
