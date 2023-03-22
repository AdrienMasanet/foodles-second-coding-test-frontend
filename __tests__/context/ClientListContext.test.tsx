import "@testing-library/jest-dom/extend-expect";
import { render, act } from "@testing-library/react";
import Client from "@/interfaces/Client";
import getClientsMock from "@/__mocks__/services/clients/getClients";
import { ClientListContext, ClientListUpdateContext, ClientListProvider } from "@/context/ClientListContext";
import { useContext } from "react";

// Create a test component that uses the context to render the client list and has a button to refresh the list
const TestComponent = () => {
  const clientList = useContext(ClientListContext);
  const { refreshClientList } = useContext(ClientListUpdateContext);

  return (
    <>
      <ul>
        {clientList.map((client) => (
          <li key={client.id}>{client.name}</li>
        ))}
      </ul>
      <button onClick={refreshClientList}>Refresh</button>
    </>
  );
};

describe("context | ClientListContext", () => {
  afterEach(() => {
    getClientsMock.mockClear();
  });

  it("should provide client list and refresh function", async () => {
    // Simulate a list of clients being returned from the service
    const clientsMock: Client[] = [
      { id: "client-uuid-1", name: "Client 1", email: "client1@example.com", credits: 100 },
      { id: "client-uuid-2", name: "Client 2", email: "client2@example.com", credits: 200 },
    ];

    getClientsMock.mockResolvedValue(clientsMock);

    const { findByText, queryByText } = render(
      <ClientListProvider>
        <TestComponent />
      </ClientListProvider>
    );

    expect(await findByText("Client 1")).toBeInTheDocument();
    expect(await findByText("Client 2")).toBeInTheDocument();

    // Now simulate a new client being added to the list to ensure the list is refreshed when the refresh button is clicked
    getClientsMock.mockResolvedValueOnce([{ id: "client-uuid-3", name: "Client 3", email: "client3@example.com", credits: 300 }]);

    const refreshButton = await findByText("Refresh");
    act(() => {
      refreshButton.click();
    });

    expect(await findByText("Client 3")).toBeInTheDocument();
    expect(queryByText("Client 1")).not.toBeInTheDocument();
    expect(queryByText("Client 2")).not.toBeInTheDocument();

    expect(getClientsMock).toHaveBeenCalledTimes(2);
  });
});
