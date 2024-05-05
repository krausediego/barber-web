import { Company } from ".";
import { server } from "../axios-request";

export const findCompanyService = async (): Promise<Company> => {
  const response = await server.get<Company>("/company/find");

  return response.data;
};
