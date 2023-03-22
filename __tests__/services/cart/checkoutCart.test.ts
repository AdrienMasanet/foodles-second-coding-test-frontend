import fetchMock from "@/__mocks__/fetch";
import checkoutCart from "@/services/cart/checkoutCart";

// Mocking fetch
global.fetch = fetchMock;

// Clear the fetch mock between each test
beforeEach(() => {
  fetchMock.mockClear();
});

describe("service | checkoutCart", () => {
  it("should return the client's new credits amount after a successful checkout", async () => {
    const cart = { "product-uuid-1": 1, "product-uuid-2": 2 };

    // Mock successful response from fetch
    const responseMock = {
      status: 200,
      json: () => Promise.resolve({ clientNewCreditsAmount: 50 }),
    };

    fetchMock.mockResolvedValueOnce(responseMock);

    const newCreditsAmount = await checkoutCart(cart);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(newCreditsAmount).toEqual(50);
  });

  it("should throw an error if the checkout fails", async () => {
    const cart = { "product-uuid-1": 1, "product-uuid-2": 2 };

    // Mock failed response from fetch
    const responseMock = {
      status: 400,
      json: () => Promise.resolve({ error: "Insufficient credits" }),
    };

    fetchMock.mockResolvedValueOnce(responseMock);

    try {
      await checkoutCart(cart);
    } catch (error) {
      expect(error).toEqual(new Error("Erreur lors de la commande, veuillez vérifier que vous avez assez de crédits !"));
    }

    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
