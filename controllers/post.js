const { Posts, sequelize } = require("../models");
const ApiError = require("../utils/ApiError");
module.exports = {
  create: async (req, res, next) => {
    const transaction = await sequelize.transaction();
    try {
      const {
        body: { title, body, userId },
      } = req;

      if (!title || !body || !userId) {
        throw new ApiError(400, "Invalid data");
      }

      await Posts.create(
        {
          title,
          body,
          userId,
        },
        { transaction }
      );

      await transaction.commit();
      res.status(201).send({
        success: true,
        message: "Post created successfully.",
      });
    } catch (err) {
      await transaction.rollback();
      next(err);
    }
  },
  get: async (req, res, next) => {
    try {
      const posts = await Posts.find();

      res.status(201).send({
        success: true,
        message: "Posts list.",
        data: posts,
      });
    } catch (err) {
      await transaction.rollback();
      next(err);
    }
  },
  getById: async (req, res, next) => {
    try {
      const {
        body: { postId },
      } = req;

      const posts = await Posts.findByPk(postId);

      res.status(201).send({
        success: true,
        message: "Posts list.",
        data: posts,
      });
    } catch (err) {
      await transaction.rollback();
      next(err);
    }
  },
  getUserPosts: async (req, res, next) => {
    try {
      const {
        body: { userId },
      } = req;

      const posts = await Posts.find({
        where: {
          userId,
        },
      });

      res.status(201).send({
        success: true,
        message: "user posts list.",
        data: posts,
      });
    } catch (err) {
      await transaction.rollback();
      next(err);
    }
  },
};
