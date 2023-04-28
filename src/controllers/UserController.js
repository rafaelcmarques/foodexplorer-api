const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");
const knex = require("../database/knex");

class UserController {
  async create(request, response) {
    const { name, email, password, isAdmin } = request.body;

    const checkUserExists = await knex("users").where({ email }).first();

    if (checkUserExists) {
      throw new AppError("Este e-mail já está em uso.");
    }

    const hashedPassword = hash(password, 8);
    const [user_id = id] = await knex("users").insert({
      name,
      email,
      password: await hashedPassword,
      isAdmin,
    });
    return response.status(201).json();
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body;
    const user_id = request.user.id;

    const user = await knex("users").where({ id: user_id }).first();

    if (!user) {
      throw new AppError("Usuário não encontrado");
    }

    try {
      const userWithUpdatedEmail = await knex("users").where({ email }).first();
      if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
        throw new AppError("Este e-mail já está em uso.");
      }

      if (password && !old_password) {
        throw new AppError(
          "Você precisa informar a senha antiga para definir a nova senha"
        );
      }
    } catch (error) {
      console.log("Não foi informado nome e email");
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError("A senha antiga não confere");
      }

      user.password = await hash(password, 8);
    }

    await knex("users").where({ id: user_id }).update({
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: knex.fn.now(),
    });

    return response.status(201).json();
  }
}

module.exports = UserController;
