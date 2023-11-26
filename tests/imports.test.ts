import { test, expect } from "vitest";

describe("import vue components", () => {
    test("normal imports as expected", async () => {
        const cmp = await import("../components/CareerForm.vue");
        expect(cmp).toBeDefined();
    });
});
describe("import vue components", () => {
    test("normal imports as expected", async () => {
        const cmp = await import("../components/EmergencyHotline.vue");
        expect(cmp).toBeDefined();
    });
});
describe("import vue components", () => {
    test("normal imports as expected", async () => {
        const cmp = await import("../components/TawkChat.vue");
        expect(cmp).toBeDefined();
    });
});
