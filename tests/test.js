var chai = require("chai");
var assert = chai.assert;
var TT = require("../index.js");

describe("Example", function(){
  it("should return true", function(done) {
    var temp = TT.test();
    assert.isTrue(temp);
    done();
  });
});
