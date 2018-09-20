"use strict";

const Hapi = require("hapi");
const db = require("./db.js");

const server = Hapi.server({
  port: 3088,
  host: "localhost"
});

server.route({
  method: "GET",
  path: "/",
  handler: (request, h) => {
    return "It Works";
  }
});

// REAL WORLD; I'd use joi to validate the id format
server.route({
  method: "GET",
  path: "/product/{id}",
  handler: (request, h) => {
    let id = request.params.id;
    let data = db.getProduct(id);

    // here find in data/db.json and return
    if (data == undefined) {
      // 404 error
    } else {
      return data;
    }
  }
});

server.route({
  method: "GET",
  path: "/search",
  handler: (request, h) => {
    let keyword = request.query.keyword;
    let data = db.search(keyword);
    return data; // empty array when nothing found so 404 not a valid response
  }
});

const init = async () => {
  await server.register({
    plugin: require("hapi-pino"),
    options: {
      prettyPrint: true,
      logEvents: ["response"]
    }
  });

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
