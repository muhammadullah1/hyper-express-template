const express = require("hyper-express");
const router = new express.Router({ mergeParams: true });
const controller = require("../controllers/post");

router
  .route("/")
  .get(controller.get)
  .post(controller.create);

module.exports = router;
