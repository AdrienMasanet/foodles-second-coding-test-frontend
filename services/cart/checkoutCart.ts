import CartProduct from "@/interfaces/CartProduct";

export async function checkoutCart(cart: CartProduct[]) {
  // Create a JSON object that is an array of objects, each object containing the product ID and quantity.
  const productsJson: { [key: string]: number } = {};
  cart.forEach((product) => {
    productsJson[product.id] = product.quantity;
  });

  // Send the JSON object to the API.
  return fetch(process.env.NEXT_PUBLIC_API_URL + "orders/new", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productsJson),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Erreur lors de la commande, veuillez vérifier que vous avez assez de crédits !");
      }
    })
    .then((data) => {
      console.log(data.clientNewCreditsAmount);
      return data.clientNewCreditsAmount;
    });
}

export default checkoutCart;
