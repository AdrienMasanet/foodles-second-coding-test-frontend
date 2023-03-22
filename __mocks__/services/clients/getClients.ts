import getClients from "@/services/clients/getClients";

jest.mock("@/services/clients/getClients");
const getClientsMock = getClients as jest.MockedFunction<typeof getClients>;

export default getClientsMock;
