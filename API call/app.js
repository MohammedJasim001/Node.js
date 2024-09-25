const http = require("http");
const url = require("url");

let array = [];

const server = http.createServer((req, res) => {
  const parseUrl = url.parse(req.url, true);
  const method = req.method;
  const path = parseUrl.pathname;

  const id = parseUrl.query.id ? parseInt(parseUrl.query.id) : null;

  res.setHeader("Content-Type", "application/json");

  if (method === "GET" && path === "/items") {
    res.statusCode = 200;
    res.end(JSON.stringify(array));
  } else if (method === "POST" && path === "/items") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      if (body) {
        const newitem = JSON.parse(body);
        newitem.id = array.length ? array[array.length - 1].id + 1 : 1;
        array.push(newitem);

        res.statusCode = 201;
        res.end(JSON.stringify(array));
      } else {
        res.statusCode = 404;
        res.end("Cannot add properties");
      }
    });
  } else if (method === "PUT" && path === "/items") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      if (body) {
        const updated = JSON.parse(body);
        let index = array.findIndex((ele) => ele.id == id);
        if (index != -1) {
          array[index] = { ...array[index], ...updated };

          res.statusCode = 200;
          res.end(JSON.stringify(array));
        } else {
          res.statusCode = 404;
          res.end("cannot find the id");
        }
      } else {
        res.statusCode = 404;
        res.end("cant update this ");
      }
    });
  } else if (method === "DELETE" && path === "/items") {
    if (id !== null) {
      const deleted = array.filter((ele) => ele.id !== id);
      array = deleted;
      res.statusCode = 200;
      res.end(JSON.stringify(array));
    } else {
      res.statusCode = 404;
      res.end("nothing to delete");
    }
  } else {
    res.statusCode = 404;
    res.end("somthing went wrong");
  }
});
server.listen(3000, () => {
  console.log("server listening port 3000");
});
