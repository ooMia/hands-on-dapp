import { getName } from "./getName";

export async function GET(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: Request,
) {
  const name = await getName();
  return Response.json({ result: name });
}
