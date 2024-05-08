import { server } from "../axios-request";
import { updateCompanyProps } from ".";

export const updateCompanyService = async (props: updateCompanyProps) => {
  console.log("props", props);
  const data = new FormData();

  data.append("id", props.id);
  data.append("name", props.name);
  data.append("description", props.description);
  data.append("types", JSON.stringify(props.types));

  console.log("DATA", data);

  await server.put("/company/update", data, { data });
};
