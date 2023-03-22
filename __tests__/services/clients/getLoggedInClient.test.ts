import fetchMock from "@/__mocks__/fetch";
import { getLoggedInClient } from "@/services/clients/getLoggedInClient";
import ConnectedClient from "@/interfaces/ConnectedClient";

// Mock fetch
global.fetch = fetchMock;

// Clear the fetch mock between each test
beforeEach(() => {
  fetchMock.mockClear();
});

describe("service | getLoggedInClient", () => {
  it("should return a ConnectedClient object if a client is logged in", async () => {
    // Mock successful response from fetch
    const mockLoggedInClient: ConnectedClient = {
      id: "client-uuid-1",
      name: "Client 1",
      email: "client1@example.com",
      credits: 100,
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:00:00.000Z",
    };

    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve(mockLoggedInClient),
    });

    const loggedInClient = await getLoggedInClient();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(loggedInClient).toEqual(mockLoggedInClient);
  });

  it("should return null if no client is logged in", async () => {
    // Mock failed response from fetch
    fetchMock.mockRejectedValueOnce(new Error("Fetch error"));

    const loggedInClient = await getLoggedInClient();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(loggedInClient).toBeNull();
  });

  it("should throw an error if the server response contains an error message", async () => {
    // Mock error response from fetch
    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve({ error: "Server error" }),
    });

    try {
      await getLoggedInClient();
    } catch (error) {
      expect(error).toEqual(new Error("Server error"));
    }
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
