"use strict";

// this is a simple database, readonly, json file source
// real applications would use mongodb/mysql etc
// I wouldn't have to write a niave search in those cases too

const fs = require("fs");
const prepareKeywords = require("./lib/prepare-keywords.js");

let db = { data: {} };

function init() {
  try {
    db.data.products = JSON.parse(fs.readFileSync("../data/db.json"));
    console.log("Loaded: ../data/db.json");
  } catch (e) {
    console.log("Fatal Error: product data unreadable");
    console.error(e);
    process.exit(1); // die on unrecoverable errors
  }

  let keywordFrequency;
  // now load up keywords - use keywords, frequency in keywords.js
  try {
    keywordFrequency = JSON.parse(fs.readFileSync("../data/keywords.json"));
    console.log("Loaded: ../data/keywords.json");
  } catch (e) {
    console.log("Fatal Error: keyword data unreadable");
    console.error(e);
    process.exit(1); // die on unrecoverable errors
  }

  db.data.search = prepareKeywords(keywordFrequency);
}

db.search = function dbSearch(keyword) {
  return db.data.search[keyword] || [];
};

db.getProduct = function getProduct(id) {
  return db.data.products[id] || null;
};

init();

module.exports = db;
