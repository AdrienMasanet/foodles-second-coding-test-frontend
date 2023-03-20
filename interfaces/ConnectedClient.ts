import Client from "./Client";

interface ConnectedClient extends Client {
  createdAt: string;
  updatedAt: string;
}

export default ConnectedClient;
