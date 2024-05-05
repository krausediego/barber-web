import { FindByUserIdResponse } from ".";
import { server } from "../axios-request";

export const findUserProfileService = async () => {
  const response = await server.get<FindByUserIdResponse>("/user-profile/find");

  return response.data;
};
