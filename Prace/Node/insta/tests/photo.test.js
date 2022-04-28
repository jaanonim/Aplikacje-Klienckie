const request = require("supertest");
const server = require("../index");

describe("GET /api/photo", () => {
    it("responds with json", (done) => {
        request(server)
            .get("/user")
            .set("Accept", "application/json")
            .expect("Content-Type", /json/)
            .expect(200, done);
    });
});
