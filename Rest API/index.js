import express from "express";
import users from "./Fake_DB.json" assert { type: "json" };
import fs from "fs";

const app = express();
const PORT = 8000;

//Middleware - plugin
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${new Date().toLocaleDateString()} : ${req.method} : ${req.path} \n`,
    (err, data) => {
      next();
    }
  );
});

//Routes
app.get("/users", (req, res) => {
  const html = `
  <table style="border-collapse: collapse; width: 100%;">
    <thead>
      <tr>
        <th style="border: 1px solid black; padding: 8px;">ID</th>
        <th style="border: 1px solid black; padding: 8px;">First Name</th>
        <th style="border: 1px solid black; padding: 8px;">Last Name</th>
        <th style="border: 1px solid black; padding: 8px;">Email</th>
        <th style="border: 1px solid black; padding: 8px;">Gender</th>
        <th style="border: 1px solid black; padding: 8px;">Job Title</th>
      </tr>
    </thead>
    <tbody>
      ${users
        .map(
          (user) => `
            <tr>
              <td style="border: 1px solid black; padding: 8px;">${user.id}</td>
              <td style="border: 1px solid black; padding: 8px;">${user.first_name}</td>
              <td style="border: 1px solid black; padding: 8px;">${user.last_name}</td>
              <td style="border: 1px solid black; padding: 8px;">${user.email}</td>
              <td style="border: 1px solid black; padding: 8px;">${user.gender}</td>
              <td style="border: 1px solid black; padding: 8px;">${user.job_title}</td>
            </tr>`
        )
        .join("")}
    </tbody>
  </table>
`;

  res.send(html);
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    res.status(404).send("User not found");
    return;
  }
  const html = `
  <table style="border-collapse: collapse; width: 100%;">
  <thead>
  <tr>
  <th style="border: 1px solid black; padding: 8px;">ID</th>
  <th style="border: 1px solid black; padding: 8px;">First Name</th>
  <th style="border: 1px solid black; padding: 8px;">Last Name</th>
  <th style="border: 1px solid black; padding: 8px;">Email</th>
  <th style="border: 1px solid black; padding: 8px;">Gender</th>
  <th style="border: 1px solid black; padding: 8px;">Job Title</th>
  </tr>
  </thead>
  <tbody>
  <tr>
  <td style="border: 1px solid black; padding: 8px;">${user.id}</td>
  <td style="border: 1px solid black; padding: 8px;">${user.first_name}</td>
  <td style="border: 1px solid black; padding: 8px;">${user.last_name}</td>
  <td style="border: 1px solid black; padding: 8px;">${user.email}</td>
  <td style="border: 1px solid black; padding: 8px;">${user.gender}</td>
  <td style="border: 1px solid black; padding: 8px;">${user.job_title}</td>
  </tr>
  </tbody>
  </table>
  `;
  res.send(html);
});

//REST API points
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users")
  .get((req, res) => {
    return res.json(users);
  })
  .post((req, res) => {
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
    users.push({ ...body, id: users.length + 1 });
    fs.writeFile("./Fake_DB.json", JSON.stringify(users), (err, data) => {
      return res.status(201).json({ status: "success", id: users.length });
    });
  });

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const updates = req.body;
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    const updatedUser = { ...users[userIndex], ...updates };
    users[userIndex] = updatedUser;

    fs.writeFile("./Fake_DB.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to update database" });
      }
      return res.json({
        status: "success",
        message: "User updated successfully",
        user: updatedUser,
      });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "User not found" });
    }

    users.splice(userIndex, 1);

    fs.writeFile("./Fake_DB.json", JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: "error", message: "Failed to update database" });
      }
      return res.json({
        status: "success",
        message: "User deleted successfully",
      });
    });
  });

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
