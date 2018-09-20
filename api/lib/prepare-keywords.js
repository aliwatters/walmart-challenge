'use strict';

const _ = require("underscore"); // or lowdash...

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
  let keywords = [];
  // get all keywords
  for (let id of Object.keys(freq)) {
    keywords = _.union(keywords, Object.keys(freq[id]));
  }

  let search = {};
  for (let word of keywords) {
    search[word] = findMatchingProducts(word, freq);
  }
  return search;
}

module.exports = prepareKeywords;
