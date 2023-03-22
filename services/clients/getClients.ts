import Client from "@/interfaces/Client";

/**
 * Retrieves the list of clients from the API without sensitive informations server using a GET request
 * @async
 * @function
 * @returns {Promise<Client[]>} - A promise that resolves to an array of client objects
 * @throws {Error} - If an error occurs during the request or if the response contains an error message
 */
async function getClients(): Promise<Client[]> {
  // CORS are enabled on the API server
  return fetch(process.env.NEXT_PUBLIC_API_URL + "clients", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data): Client[] => {
      return data.map((client: Client) => {
        if (data.error) {
          throw new Error(data.error);
        }
        return client;
      });
    })
    .catch(() => {
      return [] as Client[];
    });
}

export default getClients;
