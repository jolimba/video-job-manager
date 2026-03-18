import { MockSoraProvider } from "../providers/video/MockSoraProvider";
import { redis } from "../infra/redis/RedisClient";

describe("MockSoraProvider - change status", () => {
    const provider = new MockSoraProvider();
    beforeAll(async () => {
        await redis.connect();
    });
    beforeEach(async () => {
        await redis.flushAll();
    });
    it("should change status when valid", async () => {
        const job = await provider.createVideo("test");

        await provider.changeStatus(job.id, "processing");

        const updated = await provider.getJob(job.id);

        expect(updated.status).toBe("processing");
    });
    it("should throw an error if status is invalid", async () => {
        const job = await provider.createVideo("test");
        await expect(
        provider.changeStatus(job.id, "invalid")
        ).rejects.toThrow("Invalid status");
    });
    it("should throw an error if status doesnt exist", async () => {
        await expect(
        provider.changeStatus("fake-id", "processing")
        ).rejects.toThrow("Job not found");
    });
});