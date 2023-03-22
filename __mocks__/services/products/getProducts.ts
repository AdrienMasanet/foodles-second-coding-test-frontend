import getProducts from "@/services/products/getProducts";

jest.mock("@/services/products/getProducts");
const getProductsMock = getProducts as jest.MockedFunction<typeof getProducts>;

export default getProductsMock;
