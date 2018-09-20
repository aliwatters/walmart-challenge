const fs = require('fs');

const content = fs.readFileSync('ids.csv', 'utf8');
const ids = content.trim().split(',');

console.log(ids);

const request = require('request');

// do not hardcode keys in real apps, pull from env vars instead
const apikey = 'kjybrqfdgp3u4yv2qzcnjndj';
const baseUri = 'http://api.walmartlabs.com/v1/items/';

function getProductData(id) {
  const options = {
    url: `${baseUri}${id}?format=json&apikey=${apikey}`,
    headers: {
      'User-Agent': 'request'
    }
  };

  return new Promise((resolve, reject) => {
    request.get(options, (err, resp, body) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(body));
      }
    });
  });
}

const data = {};

function main(arr) {
  // use reduce to run promises serially
  return ids.reduce(
    (promise, item) =>
      promise
        .then(result => {
          console.log(`Retrieving item: ${item}`);
          return getProductData(item).then(val => data[item] = val);
        })
        .catch(console.error),
    Promise.resolve()
  );
}

main(ids).then(() => {
  const keys = Object.keys(data);

  // here write the data to a ../raw/<id>.json
  for (const id of keys) {
    console.log(`Writing: ../raw/${id}.json`);
    // eslint-disable-next-line
    fs.writeFileSync(`../raw/${id}.json`, JSON.stringify(data[id], null, 4));
  }
});
