const fs = require('fs');
const rawDir = '../raw/';
const files = fs.readdirSync(rawDir);

function frequency(arr) {
  const freq = {};
  for (const a of arr) {
    freq[a] == undefined ? freq[a] = 1 : freq[a]++;
  }

  return freq;
}

// real list tba
const stopWords = [
  'the',
  'it',
  'and',
  'a',
  'an',
  'to',
  'from',
  'in',
  'is',
  'you',
  'for',
  'or',
  'of',
  'this',
  'has'
];

function prepStringForFrequency(input) {
  const str = input.toLowerCase();
  // assuming a-z latin characters here for simplicity
  let arr = str.split(/\W/g);

  arr = arr.filter(word => word.length > 2);
  arr = arr.filter(word => stopWords.indexOf(word) == -1);

  return arr;
}

const keys = ['itemId', 'name', 'shortDescription', 'salePrice'];

const db = {};
const itemKeywords = {};

for (const file of files) {
  if (file.match(/^\./)) {
    continue;
  } // skip hidden files

  let detail = {};
  try {
    // eslint-disable-next-line
    detail = JSON.parse(fs.readFileSync(rawDir + file));
  } catch (e) {
    console.log(e);
    continue;
  }

  const item = {};
  keys.forEach(key => item[key] = detail[key]);

  // filter out items without an id
  if (parseInt(item.itemId, 10) > 0 && item.name.length > 2) {
    db[item.itemId] = item;

    itemKeywords[item.itemId] = frequency(
      prepStringForFrequency(item.name + ' ' + item.shortDescription)
    );
  }
}

fs.writeFileSync('../db.json', JSON.stringify(db, null, 4));
fs.writeFileSync('../keywords.json', JSON.stringify(itemKeywords, null, 4));
