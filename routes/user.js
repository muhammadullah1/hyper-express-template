const express = require("hyper-express");
const router = new express.Router({ mergeParams: true });
const controller = require("../controllers/user");

router.get("/", controller.get);

module.exports = router;