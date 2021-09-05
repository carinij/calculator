const server = require("../server/server.js");
const supertest = require("supertest");
const request = supertest(server);

describe("/calc route basic testing", () => {
  test("/calc endpoint rejects requests with no expression query", async () => {
    const res = await request.get("/calc");
    expect(res.status).toBe(400);
  });
  test("/calc endpoint rejects overly long expression queries", async () => {
    let queryString = "";
    for (let i = 0; i < 1025; i++) {
      queryString += "9";
    }
    const res = await request.get(`/calc?expression=${queryString}`);
    expect(res.status).toBe(400);
  });
  // Arguably this is just testing validation again, but there might be some
  // value in making sure server.js isn't doing anything weird to our input.
  // NB: If I were doing any more testing I'd probably create an asyncMap()
  // for myself and do this analogously to the longer tests for validate.js
  // and calc.js
  test("/calc endpoint accepts valid expression queries", async () => {
    let res = await request.get(`/calc?expression=4*4`);
    expect(res.status).toBe(200);

    res = await request.get(`/calc?expression=4%2B4`); // Addition
    expect(res.status).toBe(200);

    res = await request.get(`/calc?expression=4%2F4`); // Division
    expect(res.status).toBe(200);

    res = await request.get(`/calc?expression=4-4`);
    expect(res.status).toBe(200);

    res = await request.get(`/calc?expression=%284-4%29`); // Parentheses
    expect(res.status).toBe(200);
  });
});
