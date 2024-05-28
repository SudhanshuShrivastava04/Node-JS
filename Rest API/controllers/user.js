import { User } from "../models/user.js";

export async function handleGetAllUsers(req, res) {
  const dbUsers = await User.find({});
  return res.json(dbUsers);
}

export async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "User not found" });
  return res.json(user);
}

export async function handleUpdateUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, {
    first_name: "Sudhanshu", //hard coded
  });
  return res.json({ message: "Success" });
}

export async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ message: "Success" });
}

export async function handleCreateUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  )
    return res.status(400).json({ message: "All fields are required" });

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });

  return res.status(201).json({ message: "success", id: result._id });
}
