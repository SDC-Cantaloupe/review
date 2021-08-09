const helper = require('../db/helper.js')
const mock = require('../test/mockdata.js')

describe("tests out the metadata return function", () => {

  test("Should format metadata object", () => {
    expect(helper.formatMeta(2, mock.metaMockData)).toStrictEqual({"product_id": 2,
      "ratings":{
        "2":1,
        "3":1,
        "4":2,
        "5":1
        },
      "recommended":{
        "0":2,
        "1":3
        },
      "characteristics":{
        "Quality":{
          "id":5,
          "value":4.2,
          "count":5
        }
      }
    });
  });
});