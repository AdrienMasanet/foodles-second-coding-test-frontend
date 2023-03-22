import fetchMock from "@/__mocks__/fetch";
import { loginClient } from "@/services/clients/loginClient";
import ConnectedClient from "@/interfaces/ConnectedClient";

// Mock fetch
global.fetch = fetchMock;

// Clear the fetch mock between each test
beforeEach(() => {
  fetchMock.mockClear();
});

describe("service | loginClient", () => {
  it("should return a ConnectedClient object on successful login", async () => {
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

    const clientId = "client-uuid-1";
    const loggedInClient = await loginClient(clientId);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      process.env.NEXT_PUBLIC_API_URL + "clients/login",
      expect.objectContaining({
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: clientId }),
      })
    );
    expect(loggedInClient).toEqual(mockLoggedInClient);
  });

  it("should return null if there's an error during login", async () => {
    // Mock failed response from fetch
    fetchMock.mockRejectedValueOnce(new Error("Fetch error"));

    const clientId = "client-uuid-1";
    const loggedInClient = await loginClient(clientId);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(loggedInClient).toBeNull();
  });

  it("should throw an error if the server response contains an error message", async () => {
    // Mock error response from fetch
    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve({ error: "Server error" }),
    });

    const clientId = "client-uuid-1";
    try {
      await loginClient(clientId);
    } catch (error) {
      expect(error).toEqual(new Error("Server error"));
    }
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
