import * as viem from "viem";
import { describe, expect, it, vi } from "vitest";

vi.mock("viem", { spy: true });

describe("getClient", () => {
  it("should call createPublicClient only once", async () => {
    // Given
    const createPublicClientSpy = vi.spyOn(viem, "createPublicClient");
    const { client } = await import("./environment");

    // When
    const client1 = client;
    const client2 = client;

    // Then
    expect(createPublicClientSpy).toHaveBeenCalledTimes(1);
    expect(client1).toBe(client2);
  });
});
