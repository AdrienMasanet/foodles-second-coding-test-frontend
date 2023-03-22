import "@testing-library/jest-dom/extend-expect";
import { render, act } from "@testing-library/react";
import Product from "@/interfaces/Product";
import getProductsMock from "@/__mocks__/services/products/getProducts";
import { ProductListContext, ProductListUpdateContext, ProductListProvider } from "@/context/ProductListContext";
import { useContext } from "react";

// Create a test component that uses the context to render the product list and has a button to refresh the list
const TestComponent = () => {
  const productList = useContext(ProductListContext);
  const { refreshProductList } = useContext(ProductListUpdateContext);

  return (
    <>
      <ul>
        {productList.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <button onClick={refreshProductList}>Refresh</button>
    </>
  );
};

describe("context | ProductListContext", () => {
  afterEach(() => {
    getProductsMock.mockClear();
  });

  it("should provide product list and refresh function", async () => {
    // Simulate a list of products being returned from the service
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

    getProductsMock.mockResolvedValue(productsMock);

    const { findByText, queryByText } = render(
      <ProductListProvider>
        <TestComponent />
      </ProductListProvider>
    );

    expect(await findByText("Product 1")).toBeInTheDocument();
    expect(await findByText("Product 2")).toBeInTheDocument();

    // Now simulate a new product being added to the list to ensure the list is refreshed when the refresh button is clicked
    getProductsMock.mockResolvedValueOnce([
      {
        id: "product-uuid-3",
        name: "Product 3",
        price: 11.55,
        description: "Description 3",
        image: "string",
        stock: 10,
        updatedAt: "2023-01-01T00:00:00.000Z",
      },
    ]);

    const refreshButton = await findByText("Refresh");
    act(() => {
      refreshButton.click();
    });

    expect(await findByText("Product 3")).toBeInTheDocument();
    expect(queryByText("Product 1")).not.toBeInTheDocument();
    expect(queryByText("Product 2")).not.toBeInTheDocument();

    expect(getProductsMock).toHaveBeenCalledTimes(2);
  });
});
