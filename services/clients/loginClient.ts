import ConnectedClient from "@/interfaces/ConnectedClient";

/**
 * Logs in a client with the given ID and returns a Promise that resolves with the connected client information or null if there's an error.
 * @async
 * @function
 * @param {string} id - The ID of the client to log in.
 * @returns {Promise<ConnectedClient | null>} A Promise that resolves with a ConnectedClient object or null if there's an error.
 * @throws {Error} An error object if there's an error returned from the server.
 */
export async function loginClient(id: string): Promise<ConnectedClient | null> {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "clients/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: id,
    }),
  })
    .then((response) => response.json())
    .then((data): ConnectedClient => {
      if (data.error) {
        throw new Error(data.error);
      }
      return data;
    })
    .catch(() => {
      return null;
    });
}

export default loginClient;
