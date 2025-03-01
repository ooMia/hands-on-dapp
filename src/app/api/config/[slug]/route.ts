import { redirect } from "next/navigation";
import { client, deployer } from "./environment";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  return Response.json({ result: getResult(slug) });
}

function getResult(slug: string): string {
  let result = "not found";
  const methodName = `get${slug.charAt(0).toUpperCase() + slug.slice(1).toLowerCase()}`;
  if (typeof getterMap[methodName] === "function") {
    result = getterMap[methodName]();
  }
  if (result === "need redirect") {
    redirect(`/api/${slug}`);
  }
  return result;
}

const getterMap: { [key: string]: () => string } = {};

getterMap.getChain = function () {
  return client.chain.name;
};
getterMap.getAddress = function () {
  return deployer;
};
getterMap.getName = function () {
  return "need redirect";
};
