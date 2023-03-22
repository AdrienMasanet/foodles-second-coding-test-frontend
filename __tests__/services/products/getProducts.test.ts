import fetchMock from "@/__mocks__/fetch";
import getProducts from "@/services/products/getProducts";
import Product from "@/interfaces/Product";

// Mock fetch
global.fetch = fetchMock;

// Clear the fetch mock between each test
beforeEach(() => {
  fetchMock.mockClear();
});

describe("service | getProducts", () => {
  it("should return an array of Product objects on success", async () => {
    // Mock successful response from fetch
    const productsMock: Product[] = [
      {
        id: "product-uuid-1",
        name: "Product 1",
        price: 10,
        description: "Description 1",
        image: "string",
        stock: 10,
        updatedAt: "2023-01-01T00:00:00.000Z",
      },
      {
        id: "product-uuid-2",
        name: "Product 2",
        price: 7.51,
        description: "Description 2",
        image: "string",
        stock: 2,
        updatedAt: "2023-01-01T00:00:00.000Z",
      },
    ];

    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve(productsMock),
    });

    const productList = await getProducts();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(productList).toEqual(productsMock);
  });

  it("should return an empty array if an error occurs", async () => {
    // Mock failed response from fetch
    fetchMock.mockRejectedValueOnce(new Error("Fetch error"));

    const productList = await getProducts();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(productList).toEqual([]);
  });

  it("should throw an error if the server response contains an error message", async () => {
    // Mock error response from fetch
    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve({ error: "Server error" }),
    });

    try {
      await getProducts();
    } catch (error) {
      expect(error).toEqual(new Error("Server error"));
    }
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
