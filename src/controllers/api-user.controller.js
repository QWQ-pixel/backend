const { Router } = require("express");
const ErrorResponse = require("../classes/error-response");
const User = require("../dataBase/models/User.model");
const Token = require("../dataBase/models/Token.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
  router.get("/", asyncHandler(requireToken), asyncHandler(getUserInfo));
  router.patch("/", asyncHandler(requireToken), asyncHandler(updateUserInfo));
  router.post("/logout", asyncHandler(requireToken), asyncHandler(logout));
}

async function getUserInfo(req, res, next) {
  const user = await User.findOne({
    where: {
      id: req.token.user_id
    }
  });
  
  if (!user) {
    throw new ErrorResponse("user not found", 404);
  }
  
  res.status(200).json(user);
}
async function updateUserInfo(req, res, next) {

  const user = await User.findOne({where:{user_id: req.token.user_id}});

  if (!user) {
    throw new ErrorResponse("user not found", 404);
  }

  await User.update(
    { login: req.body.login, name: req.body.name },
    {
      where: {
        userId: req.token.user_id,
      },
    }
  );

  res.status(200).json({ message: "Info updated" });
}
async function logout(req, res, next) {
  
  await Token.destroy({
    where: {
      value: req.token.value,
    },
  });
  
  res.status(200).json({ message: "Logout" });
}

initRoutes();

module.exports = router;
