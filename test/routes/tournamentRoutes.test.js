const { request } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const app = require('../../server');
const should = chai.should();
const expect = chai.expect;

const jwtGenerator = require('../../utils/jwtGenerator');

describe('Tournament Routes', () => {
  let token;
  before(function(done) {
    token = jwtGenerator('test_user');
    done();
  });
  describe('POST /tournament', () => {
    it('should return not authorized', done => {
      chai
      .request(app)
      .post('/api/tournaments')
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body.msg).to.deep.equal('Authorization denied');
        done();
      });
    });
  });
  describe('POST /tournament/:tournament_id', () => {
    it('should return not authorized', done => {
      chai
      .request(app)
      .post('/api/tournaments/:tournament_id')
      .end((err, res) => {
        res.should.have.status(401);
        expect(res.body.msg).to.deep.equal('Authorization denied');
        done();
      });
    });
  }); 
  describe('POST /tournament', () => {
    it('should return validation errors', done => {
      chai
      .request(app)
      .post('/api/tournaments')
      .set('x-auth-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.errors.length).to.equal(7);
        done();
      });
    });
  });
   describe('POST /tournament/:tournament_id', () => {
    it('should return validation errors', done => {
      chai
      .request(app)
      .post('/api/tournaments/:tournament_id')
      .set('x-auth-token', token)
      .end((err, res) => {
        res.should.have.status(400);
        expect(res.body.errors.length).to.equal(7);
        done();
        });
      });
    }); 
});