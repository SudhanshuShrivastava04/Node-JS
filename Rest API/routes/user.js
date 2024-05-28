import express from "express";
import {
  handleCreateUser,
  handleDeleteUserById,
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
} from "../controllers/user.js";

const router = express.Router();

//REST API points
router.route("/").get(handleGetAllUsers).post(handleCreateUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

export default router;
