const { request } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../server');
const should = chai.should();
const expect = chai.expect;

describe('GET /auth', () => {
  it('should return not authorized', done => {
    chai
    .request(app)
    .get('/api/auth')
    .end((err, res) => {
      res.should.have.status(401);
      expect(res.body.msg).to.deep.equal('Authorization denied');
      done();
    });
  });
});