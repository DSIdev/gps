const chai = require("chai");
const should = chai.should();
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const userCtrl = require("../controllers/userController");

describe.only("GET /api/users/:id", () => {
  const testData = {};

  before(function() {
    testData.server = "http://localhost:3000";
    testData.validUserID = "5c824cfb3b49d51fed3b62cb";
    testData.invalidUserID = "5c824cfb3b49d51fed3b62ca";
    testData.incorrectUserID = "5c824cf";
  });

  it("Find one user", done => {
    chai
      .request(testData.server)
      .get(`/api/users/${testData.validUserID}`)
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.equal(200);
        res.type.should.equal("application/json");
        res.body.should.include.keys("_id", "guid", "isActive", "age");
        done();
      });
  });
  it("User not found", done => {
    chai
      .request(testData.server)
      .get(`/api/users/${testData.invalidUserID}`)
      .end((err, res) => {
        res.status.should.equal(404);
        res.type.should.equal("application/json");
        done();
      });
  });
  it("Incorrect user ID supplied", done => {
    chai
      .request(testData.server)
      .get(`/api/users/${testData.incorrectUserID}`)
      .end((err, res) => {
        res.status.should.equal(400);
        res.type.should.equal("application/json");
        done();
      });
  });
});
