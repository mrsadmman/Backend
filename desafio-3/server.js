const express = require("express");
const { all } = require("express/lib/application");
const Container = require("./container");
const app = express();

const port = process.env.PORT || 8080;

app.get("/products", async (req, res) => {
  const container = new Container();

  const all = await container.getAll();
  res.json(all);
});
app.get("/randomproduct", async (req, res) => {
  const container = new Container();

  const all = await container.getAll();
  let x = all[Math.floor(Math.random() * all.length)];
  res.send(x);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
