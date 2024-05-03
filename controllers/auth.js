const ApiError = require("../utils/ApiError");
const {
  Users,
  sequelize,
} = require("../models");
module.exports = {
  registerUser: async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const {
        body: { firstName, lastName, email, password, termsAccepted },
      } = req;

      const user = await Users.findOne({
        where: {
          email,
        },
        transaction,
      });

      if (user) {
        throw new ApiError(404, "Email already exists");
      }

     await Users.create(
        {
          firstName,
          lastName,
          email,
          password,
          termsAccepted,
        },
        { transaction }
      );

      await transaction.commit();
      res.status(201).send({
        success: true,
        message: "User registered successfully.",
      });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  },
  checkEmail: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await Users.count({
        where: {
          email,
        },
      });
      if (user) {
        throw new ApiError(409, "Email already exists");
      }
      res.status(200).send({
        success: true,
        message: "Please proceed! No record found",
      });
    } catch (error) {
      next(error);
    }
  },
};
