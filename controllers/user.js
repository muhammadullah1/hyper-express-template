const config = require("../config");
const {
  Users,
  sequelize,
} = require("../models");
const bcrypt = require("bcrypt");
const { encrypt } = require("../utils/token");
const ApiError = require("../utils/ApiError");


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
  get: async (req, res, next) => {
    try {
      const users = await Users.findAll();


      res.status(200).json(users);

      // res.status(200).send({
      //   success: true,
      //   message: "Users list",
      //   data: users,
      // });
    } catch (err) {
      console.log("-----error in ctach block of controller ------", err);
      next(err);
    }
  },
  login: async (req, res, next) => {
    try {
      let { email, password } = req.body;
      let user = await Users.unscoped().findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw new ApiError(404, "User doesn't exists");
      }

      if (user.archive) throw new ApiError(403, "Your account is deactivated please contact to your organization");
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new ApiError(404, "Incorrect Password.");
      }

      user = user.get({ plain: true });
      delete user.password;
      delete user.archive;
      const signInToken = encrypt(user, config.get("signIn.jwtSecret"));
      res.status(201).send({
        success: true,
        message: "User logged in successfully.",
        data: { accessToken: signInToken, user },
      });
    } catch (err) {
      next(err);
    }
  },
  changePassword: async (req, res, next) => {
    try {
      const {
        body: { currentPassword, newPassword },
        user: { email, id },
      } = req;

      const user = await Users.findOne({
        where: {
          email,
          id,
          auth_source: "Normal",
        },
      });
      if (!user) {
        throw new ApiError(404, "Something went wrong");
      }
      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) {
        throw new ApiError(400, "Your current password is incorrect");
      }
      await user.update({
        password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10)),
      });
      res.send({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const {
        body: { firstName, lastName, jobTitle },
        user: { id },
      } = req;

      const user = await Users.findOne({
        attributes: ["id", "first_name", "last_name", "job_title"],
        where: {
          id,
        },
        transaction,
      });
      if (!user) {
        throw new ApiError(404, "Something went wrong");
      }
      await user.update(
        { first_name: firstName, last_name: lastName, job_title: jobTitle },
        { transaction }
      );
      await transaction.commit();
      res.send({
        success: true,
        message: "Profile updated successfully",
        data: {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name,
          jobTitle: user.job_title,
        },
      });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  },
  forgotPassword: async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const {
        body: { email },
      } = req;
      if (!email) throw new ApiError(404, "Email is required");
      const user = await Users.findOne({
        attributes: ["id", "email", "first_name", "last_name"],
        where: {
          email,
        },
        transaction,
      });
      if (!user) throw new ApiError(404, "Invalid email address");
      const resetToken = encrypt(user, config.get("signIn.jwtSecret"));

      await transaction.commit();
      res.send({
        success: true,
        message: "Reset link sent to the given email",
        data: resetToken
      });
    } catch (error) {
      await transaction.rollback();
      next(error);
    }
  },
  checkForgotPasswordToken: async (req, res, next) => {
    try {
      const { data } = req;
      const user = await Users.findOne({
        where: {
          id: data.user.id,
          email: data.user.email,
        },
      });
      if (!user) throw new ApiError(404, "Something went wrong");
      res.send({
        success: true,
        message: "Valid token",
        data: data.user,
      });
    } catch (error) {
      next(error);
    }
  },
  resetPassword: async (req, res, next) => {
    try {
      const {
        body: { password },
        data: {
          user: { id, email },
        },
      } = req;
      const user = await Users.findOne({
        where: {
          email,
          id,
          auth_source: "Normal",
        },
      });
      if (!user) {
        throw new ApiError(404, "Something went wrong");
      }

      await user.update({
        password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      });
      res.send({
        success: true,
        message: "Password reset successfully",
      });
    } catch (error) {
      next(error);
    }
  },
};
