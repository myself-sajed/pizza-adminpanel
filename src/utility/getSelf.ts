import { self } from "../http/api";

const getSelf = async () => {
  const { data } = await self();
  return data;
};

export default getSelf;
