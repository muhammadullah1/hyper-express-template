const ApiError = require("../utils/ApiError");
const {
  Users,
  sequelize,
} = require("../models");
module.exports = {
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
