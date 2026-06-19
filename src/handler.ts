import { Handler } from "aws-lambda";

export const handler: Handler = async (event) => {
  console.log("Batch handler invoked", JSON.stringify({ source: (event as Record<string, unknown>)?.source, detailType: (event as Record<string, unknown>)?.["detail-type"] }));
  return { statusCode: 200, body: "OK" };
};
