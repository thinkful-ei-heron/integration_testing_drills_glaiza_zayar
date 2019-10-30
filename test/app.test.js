const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Basic App working test', () => {
  it('should return a message from GET at path /', () => {
    return supertest(app)
      .get('/')
      .query({number:2})
      .expect(200, 'Hello Express!')
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array')

    })
  })
})