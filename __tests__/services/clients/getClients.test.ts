import fetchMock from "@/__mocks__/fetch";
import { getClients } from "@/services/clients/getClients";
import Client from "@/interfaces/Client";

// Mock fetch
global.fetch = fetchMock;

// Clear the fetch mock between each test
beforeEach(() => {
  fetchMock.mockClear();
});

describe("service | getClients", () => {
  it("should return an array of Client objects on success", async () => {
    // Mock successful response from fetch
    const mockClients: Client[] = [
      {
        id: "client-uuid-1",
        name: "Client 1",
        email: "client1@example.com",
        credits: 100,
      },
      {
        id: "client-uuid-2",
        name: "Client 2",
        email: "client2@example.com",
        credits: 50,
      },
    ];

    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve(mockClients),
    });

    const clientList = await getClients();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(clientList).toEqual(mockClients);
  });

  it("should return an empty array if an error occurs", async () => {
    // Mock failed response from fetch
    fetchMock.mockRejectedValueOnce(new Error("Fetch error"));

    const clientList = await getClients();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(clientList).toEqual([]);
  });

  it("should throw an error if the server response contains an error message", async () => {
    // Mock error response from fetch
    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve({ error: "Server error" }),
    });

    try {
      await getClients();
    } catch (error) {
      expect(error).toEqual(new Error("Server error"));
    }
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
