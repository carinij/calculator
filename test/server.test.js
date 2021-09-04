const server = require('../server/server.js');
const supertest = require('supertest');
const request = supertest(server);

test("/calc endpoint rejects requests with no formula query", async () => {
  const res = await request.get('/calc');
  expect(res.status).toBe(400);
})