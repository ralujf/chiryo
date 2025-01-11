const { request } = require('supertest')
const app = require('../index')

describe('Entry test', () => {
    it('Initialisation Test', () => {
        request(app)
        .get('/')
        .expect(200)
        .end((err, res) => { if (err) throw err; } )
    })
})



