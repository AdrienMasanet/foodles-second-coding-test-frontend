/**
 * Sends the cart dictionary as a JSON object to the API and returns the client's new credit amount after checkout.
 * @async
 * @function
 * @param {Object.<string, number>} cart - A dictionary representing the cart with items as keys and their quantities as values
 * @returns {Promise<number>} - A promise that resolves to the client's new credit amount after the order has been placed
 * @throws {Error} - If an error occurs during the request or if the response status is not 200
 */
async function checkoutCart(cart: { [key: string]: number }) {
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
      return data.clientNewCreditsAmount;
    });
}

export default checkoutCart;
