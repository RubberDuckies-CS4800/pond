const request = require('supertest')
const app = require('./app.js')

describe('GET /', () => {
  describe('when the home route is accessed', () => {
    test('should respond with "hello world"', () => {
      return request(app)
        .get('/')
        .then((response) => {
          expect(response.text).toBe('hello world')
        })
    })

    // should respond with a 200 status code
  })
})
