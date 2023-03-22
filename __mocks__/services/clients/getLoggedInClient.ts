import getLoggedInClient from "@/services/clients/getLoggedInClient";

jest.mock("@/services/clients/getLoggedInClient");
const getLoggedInClientMock = getLoggedInClient as jest.MockedFunction<typeof getLoggedInClient>;

export default getLoggedInClientMock;
