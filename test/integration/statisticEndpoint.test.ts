import request from "supertest"
import app from "../../src/app"
import type SummaryStatistics from "../../src/models/summaryStatistics"

describe("Statistic API", () => {
    // Check object type by interface
    function isMyInterface(obj: any): obj is SummaryStatistics {
            return obj && typeof obj === 'object' && 'count' in obj && 'sum' in obj && 'average' in obj && 'min' in obj && 'max' in obj
        }
    it("should be sucess when sending get statistics", async () => {
        const response = await request(app)
            .get("/api/estatistica")
            .send()
        expect(isMyInterface(response.body)).toBe(true)
        expect(response.status).toBe(200)
    })
    // Close the app after all tests
    afterAll(async () => {
        await app.close()
    })
})