import "@testing-library/jest-dom/extend-expect";
import { render, act } from "@testing-library/react";
import ConnectedClient from "@/interfaces/ConnectedClient";
import getLoggedInClientMock from "@/__mocks__/services/clients/getLoggedInClient";
import { AuthenticationContext, AuthenticationUpdateContext, AuthenticationProvider } from "@/context/AuthenticationContext";
import { useContext } from "react";

// Create a test component that uses the context to render the logged in client data and has a button to logout
const TestComponent = () => {
  const loggedInClient = useContext(AuthenticationContext);
  const { logout, setNewCreditsAmount } = useContext(AuthenticationUpdateContext);

  return (
    <>
      {loggedInClient && (
        <>
          <div>{loggedInClient.name}</div>
          <div>{loggedInClient.email}</div>
          <div>{loggedInClient.credits}</div>
          <div>{loggedInClient.updatedAt}</div>
          <div>{loggedInClient.createdAt}</div>
        </>
      )}
      <button onClick={logout}>Logout</button>
      <button onClick={() => setNewCreditsAmount(200)}>Update Credits</button>
    </>
  );
};

describe("context | AuthenticationContext", () => {
  afterEach(() => {
    getLoggedInClientMock.mockClear();
  });

  it("should provide loggedInClient and login/logout function", async () => {
    // Simulate a logged in client being returned from the getLoggedInClient function
    const loggedInClientMock: ConnectedClient = {
      id: "client-uuid-1",
      name: "Client 1",
      email: "client1@example.com",
      credits: 100,
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:01:00.000Z",
    };

    // Simulate a logged in client being returned from getLoggedInClient function
    getLoggedInClientMock.mockResolvedValue(loggedInClientMock);

    const { findByText, queryByText } = render(
      <AuthenticationProvider>
        <TestComponent />
      </AuthenticationProvider>
    );

    expect(await findByText("Client 1")).toBeInTheDocument();
    expect(await findByText("client1@example.com")).toBeInTheDocument();
    expect(await findByText("100")).toBeInTheDocument();
    expect(await findByText("2023-01-01T00:00:00.000Z")).toBeInTheDocument();
    expect(await findByText("2023-01-01T00:01:00.000Z")).toBeInTheDocument();

    // Now simulate a logout to ensure the loggedInClient state is null
    const logoutButton = await findByText("Logout");
    act(() => {
      logoutButton.click();
    });

    // Then the client data should no longer be rendered in the DOM
    expect(queryByText("Client 1")).not.toBeInTheDocument();
    expect(queryByText("client1@example.com")).not.toBeInTheDocument();
    expect(queryByText("100")).not.toBeInTheDocument();
    expect(queryByText("2023-01-01T00:00:00.000Z")).not.toBeInTheDocument();
    expect(queryByText("2023-01-01T00:01:00.000Z")).not.toBeInTheDocument();

    expect(getLoggedInClientMock).toHaveBeenCalledTimes(1);
  });

  it("should update loggedInClient credits amount", async () => {
    // Simulate a logged in client being returned from the getLoggedInClient function
    const loggedInClientMock: ConnectedClient = {
      id: "client-uuid-1",
      name: "Client 1",
      email: "client1@example.com",
      credits: 100,
      createdAt: "2023-01-01T00:00:00.000Z",
      updatedAt: "2023-01-01T00:01:00.000Z",
    };

    getLoggedInClientMock.mockResolvedValue(loggedInClientMock);

    const { findByText, queryByText } = render(
      <AuthenticationProvider>
        <TestComponent />
      </AuthenticationProvider>
    );

    expect(await findByText("100")).toBeInTheDocument();

    // Now simulate a credit update to ensure the loggedInClient credits amount is updated
    const updateCreditsButton = await findByText("Update Credits");
    act(() => {
      updateCreditsButton.click();
    });

    expect(await findByText("200")).toBeInTheDocument();

    expect(getLoggedInClientMock).toHaveBeenCalledTimes(1);
  });
});
