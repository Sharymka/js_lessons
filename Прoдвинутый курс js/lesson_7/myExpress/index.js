const express = require("express");

const app = express();

app.listen("3000", () => {
  console.log("Соединение установлено");
});

app.get("/", (req, res) => {
  res.send("Ответ от сервера!");
});
