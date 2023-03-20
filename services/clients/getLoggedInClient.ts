import ConnectedClient from "@/interfaces/ConnectedClient";

/**
 * Retrieves the currently logged-in client from the API.
 * @async
 * @function
 * @returns {Promise<ConnectedClient | null>} A promise that resolves with a ConnectedClient object if a client is logged in, or null if no client is logged in.
 * @throws {Error} If the API returns an error message.
 */
export async function getLoggedInClient(): Promise<ConnectedClient | null> {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "clients/loggedin", {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data): ConnectedClient => {
      if (data.error) {
        throw new Error(data.error);
      }
      return data as ConnectedClient;
    })
    .catch(() => {
      return null;
    });
}

export default getLoggedInClient;
