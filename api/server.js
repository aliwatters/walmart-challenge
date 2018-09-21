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
    return "Simple API Server for Walmart Take-Home Challenge";
  }
});

// REAL WORLD; I'd use joi to validate the id format
server.route({
  method: "GET",
  path: "/product/{id}",
  options: { cors: true },
  handler: (request, h) => {
    let id = request.params.id;
    let data = db.getProduct(id);

    if (data == undefined) {
      return h.response("Error: Not Found").code(404);
    } else {
      return data;
    }
  }
});

server.route({
  method: "GET",
  path: "/search",
  options: { cors: true },
  handler: (request, h) => {
    if (!request.query.keyword) {
      return h.response("Error: Invalid Query").code(400);
    }

    let inKeyword = request.query.keyword;

    // split by boundry, and only use first word
    let keyword = inKeyword.split(/\W/g)[0].toLowerCase() || "";

    let data = db.search(keyword);
    return data; // empty array when nothing found
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
