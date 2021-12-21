const { Router } = require("express");
const { Op } = require("sequelize");
const ErrorResponse = require("../classes/error-response");
const User = require("../dataBase/models/User.model");
const Token = require("../dataBase/models/Token.model");
const { asyncHandler } = require("../middlewares/middlewares");
const { nanoid } = require("nanoid");

const router = Router();

function initRoutes() {
  router.post("/registration", asyncHandler(registration));
  router.post("/login", asyncHandler(login));
}

async function registration(req, res, next) {
  const registration = await User.findOne({
    where: {
      [Op.or]: [{ email: req.body.email }, { login: req.body.login }],
    },
  });

  if (registration) {
    throw new ErrorResponse("email already registered", 404);
  }

  const user = await User.create(req.body);

  res.status(200).json(user);
}

async function login(req, res, next) {
  const user = await User.findOne({ where: { login: req.body.login } });

  if (!user) {
    throw new ErrorResponse("user not registered", 404);
  }

  if (user.password !== req.body.password) {
    throw new ErrorResponse("wrong password", 401);
  }

  const token = await Token.create({ user_id: user.id, value: nanoid() });

  res.status(200).json({ token: token.value });
}

initRoutes();

module.exports = router;
