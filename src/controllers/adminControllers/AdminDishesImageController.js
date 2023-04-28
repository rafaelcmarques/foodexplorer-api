const knex = require("../../database/knex");
const AppError = require("../../utils/AppError");
const DiskStorage = require("../../providers/DiskStorage");

class AdminDishesImageController {
  async update(request, response) {
    const user_id = request.user.id;
    const imageFileName = request.file.filename;
    const { id } = request.params;

    const diskStorage = new DiskStorage();

    const dishe = await knex("dishes").where({ id }).where({ user_id }).first();

    if (!dishe) {
      throw new AppError("Prato não foi encontrado!", 400);
    }

    if (dishe.image) {
      await diskStorage.deleteFile(dishe.image);
    }

    const filename = await diskStorage.saveFile(imageFileName);
    dishe.image = filename;

    await knex("dishes").update(dishe).where({ id });

    return response.json(dishe);
  }
}

module.exports = AdminDishesImageController;
