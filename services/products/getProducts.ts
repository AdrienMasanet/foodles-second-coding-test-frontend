import Product from "@/interfaces/Product";

/**
 * Retrieves a list of Product objects from the server using the Fetch API.
 * @async
 * @function getProduct
 * @returns {Promise<Product[]>} - A promise that resolves to an array of Product objects.
 * @throws {Error} - An error is thrown if the server response contains an error message.
 */
export async function getProduct(): Promise<Product[]> {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "products", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data): Product[] => {
      return data.map((product: Product) => {
        if (data.error) {
          throw new Error(data.error);
        }
        return product;
      });
    })
    .catch(() => {
      return [] as Product[];
    });
}

export default getProduct;
