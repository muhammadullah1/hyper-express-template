const express = require("hyper-express");
const router = new express.Router({ mergeParams: true });
const controller = require("../controllers/auth");

router.post("/checkEmail",
controller.checkEmail);
module.exports = router;
