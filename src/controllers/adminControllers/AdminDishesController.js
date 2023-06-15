const knex = require("../../database/knex");
const AppError = require("../../utils/AppError");
const DiskStorage = require("../../providers/DiskStorage");

class AdminDishesController {
  async create(request, response) {
    const { name, category, price, description, ingredients } = request.body;
    const user_id = request.user.id;

    const [dishe_id] = await knex("dishes").insert({
      name,
      category,
      price,
      description,
      user_id,
    });

    const ingredientsInsert = ingredients.map((ingredient) => {
      return {
        user_id,
        dishe_id,
        name: ingredient,
      };
    });
    await knex("ingredients").insert(ingredientsInsert);

    return response.json({ id: dishe_id });
  }

  async delete(request, response) {
    const { id } = request.params;
    const diskStorage = new DiskStorage();
    const dishe = await knex("dishes").where({ id }).first(); // Usar .first() para obter o primeiro resultado

    if (dishe.image) {
      await diskStorage.deleteFile(dishe.image);
    }

    await knex("dishes").where({ id }).del(); // Usar .del() para excluir o registro

    return response.json();
  }

  async show(request, response) {
    const { id } = request.params;
    const user_id = request.user.id;

    const dishe = await knex("dishes").where({ id }).where({ user_id }).first();
    if (!dishe) {
      throw new AppError("Prato não encontrado", 400);
    }

    const ingredients = await knex("ingredients")
      .where({ dishe_id: id })
      .where({ user_id })
      .orderBy("name");

    return response.json({ ...dishe, ingredients });
  }

  async index(request, response) {
    const { name, ingredients } = request.query;
    const user_id = request.user.id;

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
          "dishes.description",
          "dishes.price",
          "dishes.category",
          "dishes.image",
        ])
        .where("dishes.user_id", user_id)
        .whereLike("dishes.name", `%${name}%`)
        .whereIn("ingredients.name", filterIngredients)
        .innerJoin("dishes", "dishes.id", "ingredients.dishe_id");
    } else {
      dishes = await knex("dishes")
        .where({ user_id })
        .whereLike("name", `%${name}%`)
        .orderBy("name");
    }

    const userIngredients = await knex("ingredients").where({ user_id });

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

  async update(request, response) {
    const { name, category, ingredients, price, description } = request.body;
    const { id } = request.params;
    const user_id = request.user.id;

    const dishe = await knex("dishes").where({ id }).first();
    if (!dishe) {
      throw new AppError("Prato não encontrado!");
    }

    await knex("dishes").where({ id }).update({
      name,
      category,
      price,
      description,
    });

    await knex("ingredients").where({ dishe_id: id }).del(); // Exclui todos os ingredientes relacionados ao prato

    const ingredientsInsert = ingredients.map((ingredient) => {
      return {
        user_id,
        dishe_id: id,
        name: ingredient.name, // Supondo que a coluna de nome seja 'name'
      };
    });

    await knex("ingredients").insert(ingredientsInsert);
    return response.status(201).json();
  }
}

module.exports = AdminDishesController;
