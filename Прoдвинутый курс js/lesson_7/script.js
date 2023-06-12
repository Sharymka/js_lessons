// const c = require("./func");
// console.log(c.func.a(2));
// console.log(c.func.b(5));

// const os = require("os");
// console.log(os.cpus());

// // запись данных в файл

// const fs = require("fs");
// let users = [{ name: "Иван", id: 10 }];
// fs.writeFile("test.json", JSON.stringify(users), (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Данные успешно записаны");
//   }
// });

// // чтение файлов

// fs.readFile("test.json", "UTF-8", (err, data) => {
//   let user = '{ "name": "Вася", "id": 12 }';
//   if (err) {
//     console.log(err);
//   } else {
//     let users = JSON.parse(data);
//     users.push(JSON.parse(user));
//     fs.writeFile("test.json", JSON.stringify(users), (err) => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   }
// });

// const moment = require("moment");

// console.log(moment().format("MMMM Do YYYY, h:mm:ss a"));

const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Welcom to servser!");
    res.end();
  }
});

server.on("connection", (socket) => {
  console.log("Соединение установлено!");
});

server.listen("3000");
