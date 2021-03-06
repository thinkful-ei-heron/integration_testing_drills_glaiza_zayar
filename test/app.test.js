const { expect } = require('chai');
const supertest = require('supertest');
const app = require('../app');

describe('Basic App working test', () => {
  it('Should return a message from GET at path /', () => {
    return supertest(app)
      .get('/')
      .expect(200)
  })

  it('Movie path should require authorization', () => {
    return supertest(app)
      .get('/movie')
      .expect(401, { error: "Unauthorized request" })
  });

  it('Movie path returns array when authorization successful', () => {
    return supertest(app)
      .get('/movie')
      .set('Authorization', 'Bearer 1234567')
      .expect(200)
      .then(res => {
      expect(res.body).to.be.an('array')
    })
  })

  it('It filters movie according to genre query', () => {
    return supertest(app)
    .get('/movie')
    .query({genre: 'Action'})
    .set('Authorization', 'Bearer 1234567')
    .expect(200)
    .expect('Content-type', /json/)
    .then(res => {
      expect(res.body[0].genre.toLowerCase()).to.eql('action')
    })
  })

  it('If no movie found, length of response === 0', () => {
    return supertest(app)
      .get('/movie')
      .query({ genre: 'Testing' })
      .set('Authorization', 'Bearer 1234567')
      .expect(200)
      .expect('Content-type', /json/)
      .then(res => {
        expect(res.body.length).to.be.eql(0)
      })
  })

  it('Check if the response body has correct key for genre, country and title', () => {
      return supertest(app)
      .get('/movie')
      .set('Authorization', 'Bearer 1234567')
      .expect(200)
      .expect('Content-type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body.length).to.greaterThan(0);
        expect(res.body[0]).to.be.an('object')
        expect(res.body[0]).to.include.all.keys('genre', 'country', 'film_title', 'avg_vote')
      })
  })

  it('Check if avg vote filter returns movies that are equal to or greater than avg_vote', () => {
    let rating = 3
    return supertest(app)
      .get('/movie')
      .query({avg_vote:rating})
      .set('Authorization', 'Bearer 1234567')
      .expect(200)
      .expect('Content-type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array')
        expect(res.body[0]).to.be.an('object')
        let filtered = true
        let i = 0
        while (filtered && i < res.body.length-1) {
          if (res.body[i].avg_vote <= rating) {
            filtered = false
            break
          }
          i++
        }
        expect(filtered).to.be.true

      })
  })

})