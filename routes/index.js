const express = require("hyper-express");
const router = new express.Router();

// Routers
const userRouter = require("./user");
const postRouter = require("./post")
const authRouter = require("./auth");

router.use("/users", userRouter);
router.use("/auths", authRouter);
router.use("/posts", postRouter);

module.exports = router;