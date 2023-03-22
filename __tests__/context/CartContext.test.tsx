import "@testing-library/jest-dom/extend-expect";
import { render, act } from "@testing-library/react";
import { CartContext, CartPriceContext, CartUpdateContext, CartProvider } from "@/context/CartContext";
import Product from "@/interfaces/Product";
import { useContext } from "react";

// Create a test component that uses the context to render the cart and has buttons to add and subtract products from the cart
const TestComponent = ({ product }: { product: Product }) => {
  const cart = useContext(CartContext);
  const cartPrice = useContext(CartPriceContext);
  const { addProduct, subtractProduct, resetCart } = useContext(CartUpdateContext);

  return (
    <>
      <ul>
        {Object.keys(cart).map((productId) => (
          <li key={productId}>
            {productId} : {cart[productId]}
          </li>
        ))}
      </ul>
      <div>Cart price : {cartPrice}</div>
      <button onClick={() => addProduct(product)}>Add to cart</button>
      <button onClick={() => subtractProduct(product)}>Remove from cart</button>
      <button onClick={() => resetCart()}>Reset cart</button>
    </>
  );
};

describe("context | CartContext", () => {
  it("should provide cart, cart price, and update functions", async () => {
    const productMock: Product = {
      id: "product-uuid-1",
      name: "Product 1",
      price: 10,
      description: "Description 1",
      image: "string",
      stock: 10,
      updatedAt: "2023-01-01T00:00:00.000Z",
    };

    const { findByText } = render(
      <CartProvider>
        <TestComponent product={productMock} />
      </CartProvider>
    );

    // Check that the cart is initially empty
    expect(await findByText("Cart price : 0")).toBeInTheDocument();
    expect(await findByText("Reset cart")).toBeInTheDocument();

    // Add one product to the cart
    const addToCartButton = await findByText("Add to cart");
    act(() => {
      addToCartButton.click();
    });

    expect(await findByText("product-uuid-1 : 1")).toBeInTheDocument();
    expect(await findByText("Cart price : 10")).toBeInTheDocument();

    // Add another product to the cart
    act(() => {
      addToCartButton.click();
    });

    expect(await findByText("product-uuid-1 : 2")).toBeInTheDocument();
    expect(await findByText("Cart price : 20")).toBeInTheDocument();

    // Remove one product from the cart
    const removeFromCartButton = await findByText("Remove from cart");
    act(() => {
      removeFromCartButton.click();
    });

    expect(await findByText("product-uuid-1 : 1")).toBeInTheDocument();
    expect(await findByText("Cart price : 10")).toBeInTheDocument();

    // Reset the cart
    const resetCartButton = await findByText("Reset cart");
    act(() => {
      resetCartButton.click();
    });

    expect(await findByText("Cart price : 0")).toBeInTheDocument();
  });
});
