import { Handler } from "aws-lambda";

export const handler: Handler = async (event) => {
  console.log("Batch handler invoked", JSON.stringify(event));
  return { statusCode: 200, body: "OK" };
};
