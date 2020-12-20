const sinon = require('sinon');
const chai = require('chai');
const expect = chai.expect;
const userRepository = require('../data/userRepository');
const authController = require('../controllers/authController');

describe('Auth controller', () => {
  let req = {
    body: { email: "not@n.email" }
  };

  let res = { };
  let expectedResults;

  describe('Get authorized users email', () => {
    beforeEach(function () {
      res = {
          json: sinon.spy(),
          status: sinon.stub().returns({ end: sinon.spy() }) // to spy res.status(500).end()
      };
    });
    it('should return a users email', async () => {
      expectedResults = req.body;
      sinon.stub(userRepository, 'getUserByEmail').returns(expectedResults);
      authController.getUser(req, res);
      sinon.assert.calledWith(userRepository.getUserByEmail, req.body.email);
    });
  });
});
