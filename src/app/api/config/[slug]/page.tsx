import CodeHighlight from "@/component/CodeHighlight";
import { client, deployer, nextPhase } from "./environment";
import { name } from "./getName";

export async function generateStaticParams() {
  return Object.keys(getterMap).map((key) => ({
    slug: key,
  }));
}

export default async function Config({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <div id="result">
      <CodeHighlight language="json">
        {JSON.stringify({
          result: getResult(slug),
        })}
      </CodeHighlight>
    </div>
  );
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
