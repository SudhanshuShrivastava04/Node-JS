import express from "express";
import users from "./Fake_DB.json" assert { type: "json" };

const app = express();
const PORT = 8000;

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
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    //TODO: Edit the user with id
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    //TODO: Delete the user with id
    return res.json({ status: "pending" });
  });

app.post("/api/users", (req, res) => {
  //TODO: Create new user
  return res.json({ status: "pending" });
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
