const prepareKeywords = require("./prepare-keywords.js");

const freq = {
  "23117408": {
    front: 1,
    twisted: 1,
    chain: 1,
    backpack: 1,
    beat: 1
  },
  "35613901": {
    cheetah: 2,
    print: 2,
    backpack: 4
  },
  "35813552": {
    black: 1,
    pocket: 2,
    backpack: 2,
    sharks: 1,
    fashionable: 1
  }
};

// small sample of unit tests on the most complex function in the api

test("Correctly loads freq data for search", () => {
  let keywords = prepareKeywords(freq);
  expect(keywords.backpack).toEqual(["35613901", "35813552", "23117408"]);
});

test("Empty freq data for search handled", () => {
  let keywords = prepareKeywords({});
  expect(keywords).toEqual({});
});
