const { Users, sequelize } = require("../models");
const ApiError = require("../utils/ApiError");
module.exports = {
  register: async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      let { email, password } = req.body;
      const admin = await Users.findOne({
        attributes: ["id"],
        where: {
          email,
        },
        raw: true,
        transaction,
      });
      if (admin) {
        throw new ApiError(404, "User already exists");
      }
      await Users.create(
        {
          email,
          password,
          is_super_admin: true,
        },
        { transaction }
      );

      await transaction.commit();
      res.status(201).send({
        success: true,
        message: "Superadmin registered in successfully.",
      });
    } catch (err) {
      await transaction.rollback();
      next(err);
    }
  },
};
