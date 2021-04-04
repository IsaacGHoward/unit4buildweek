const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')

const userA = { user_username: 'foo', user_password: 'bar' }
const userB = { user_username: 'fizz', user_password: 'buzz', role_id: 1 }
const userC = { user_username: 'foo', user_password: 'buzz', role_id: 2 }


beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async (done) => {
  await db.destroy()
  done()
})

it('sanity check', () => {
  expect(true).not.toBe(false)
})

describe('server.js', () => {
  it('is the correct testing environment', async () => {
    expect(process.env.NODE_ENV).toBe('testing')
  })
})

describe('POST /api/auth/register', () => {
  it('adds a user to the DB', () => {
    return request(server).post('/api/auth/register')
      .send(userA)
      .then(res => {
        expect(res.body.user_username).toBe(userA.user_username)
        expect(res.body.user_id).toBe(1)
        expect(res.body.role_name).toBe("Owner")
      })
  })
})

describe('POST /api/auth/login', () => {
  it('logs user in', () => {
    return request(server).post('/api/auth/login')
      .send(userA)
      .then(res => {
        expect(res.body.token).toBeDefined();
      })
  })
})

describe('GET /api/users', () => {
  it('get users from DB', () => {
    return request(server).get('/api/users')
      .then(res => {
        expect(res.body.length).toBeGreaterThan(0);
      })
  })
})

describe('GET /api/items', () => {
  it('get items from DB', () => {
    return request(server).get('/api/items')
      .then(res => {
        expect(res.body.length).toBeGreaterThan(0);
      })
  })
})

describe('GET /api/items/categories', () => {
  it('get items from DB', () => {
    return request(server).get('/api/items/categories')
      .then(res => {
        expect(res.body.length).toBeGreaterThan(0);
      })
  })
})