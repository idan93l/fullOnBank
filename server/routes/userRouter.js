const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateDeposit,
  updateCredit,
  withdrawFromUser,
  transitionUsers,
} = require("../controllers/usersController.js");
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", createUser);
userRouter.delete("/:id", deleteUser);
userRouter.put("/deposit/:id", updateDeposit);
userRouter.put("/credit/:id", updateCredit);
userRouter.put("/withdrawal/:id", withdrawFromUser);
userRouter.put("/transition/:id", transitionUsers);
// productRouter.delete('/',deleteAllProducts);

module.exports = userRouter;
