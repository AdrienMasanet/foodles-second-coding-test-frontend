export async function checkoutCart(cart: { [key: string]: number }) {
  // Send the cart dictionnary as JSON object to the API.
  return fetch(process.env.NEXT_PUBLIC_API_URL + "orders/new", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
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
