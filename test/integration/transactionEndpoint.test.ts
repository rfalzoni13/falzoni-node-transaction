import request from "supertest"
import app from "../../src/app"
import moment from "moment"

describe("Transaction API", () => {
    it("should create a new transaction", async () => {
        const response = await request(app)
            .post("/api/transacao")
            .send({
                valor: 1000,
                dataHora: moment(Date.parse("2025-07-30T14:10:05.000Z")).format("YYYY-MM-DD HH:mm:ss"),
            })
        expect(response.status).toBe(201)
    })
    it("should be unprocessable entity when sending wrong transaction", async () => {
        const response = await request(app)
            .post("/api/transacao")
            .send({
                valor: -1000,
                dataHora: moment(Date.parse("2025-07-30T14:10:05.000Z")).format("YYYY-MM-DD HH:mm:ss"),
            })
        expect(response.status).toBe(422)
    })
    it("should be bad request when sending empty body", async () => {
        const response = await request(app)
            .post("/api/transacao")
            .send({})
        expect(response.status).toBe(400)
    })
    it("should be sucess when sending delete", async () => {
        const response = await request(app)
            .delete("/api/transacao")
            .send()
        expect(response.status).toBe(200)
    })
    // Close the app after all tests
    afterAll(async () => {
        await app.close()
    })
})