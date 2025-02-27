import { getName } from "./getName";

export async function GET() {
  const name = await getName();
  return Response.json({ result: name });
}
