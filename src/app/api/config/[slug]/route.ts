import { client, deployer, nextPhase } from "./environment";
import { name } from "./getName";

export async function generateStaticParams() {
  return Object.keys(getterMap).map((key) => ({
    slug: key,
  }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  return Response.json({ result: getResult(slug) });
}

function getResult(slug: string): string {
  const methodName = slug.toUpperCase() as GetterMapKeys;
  const result = getterMap[methodName]?.() ?? "not found";
  return result;
}

type GetterMapKeys = Uppercase<string>;
const getterMap: { [key: GetterMapKeys]: () => string } = {};

getterMap.CHAIN = () => client.chain.name;
getterMap.ADDRESS = () => deployer;
getterMap.NAME = () => name;
getterMap.NEXT_PHASE = () => nextPhase;
