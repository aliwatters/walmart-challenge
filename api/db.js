"use strict";

// this is a simple database, readonly, json file source
// real applications would use mongodb/mysql etc
// I wouldn't have to write a niave search in those cases too

const fs = require("fs");
const _ = require("underscore"); // or lowdash...

let db = {data:{}};

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

function findMatchingProducts(word, freq) {
  let productMatch = {};
  for (let id of Object.keys(freq)) {
    let x = freq[id][word];
    if (x > 0) {
      productMatch[x] = id;
    }
  }

  let matches = [];
  // reverse integer sort - most to least relevant
  let scores = Object.keys(productMatch).sort((a, b) => parseInt(a, 10) < parseInt(b, 10));
  scores.forEach(v => matches.push(productMatch[v]));
  return matches;
}

function prepareKeywords(freq) {
  // sets up a simple "search" based on frequency of words
  console.log('Loading keywords');
  let keywords = [];
  // get all keywords
  for (let id of Object.keys(freq)) {
    keywords = _.union(keywords, Object.keys(freq[id]));
  }
  console.log("Found unique keywords: ", keywords.length);

  let search = {};
  for (let word of keywords) {
    search[word] = findMatchingProducts(word, freq);
  }
  return search;
}

db.data.search = prepareKeywords(keywordFrequency);



db.search = function dbSearch(keyword) {
  return db.data.search[keyword] || [];
}

db.getProduct = function getProduct(id) {
  return db.data.products[id] || null;
}

module.exports = db;
