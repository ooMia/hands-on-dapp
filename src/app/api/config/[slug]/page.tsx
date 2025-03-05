import CodeHighlight from "@/component/CodeHighlight";
import { client, deployer } from "./environment";
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
  const methodName = slug.toLowerCase() as GetterMapKeys;
  const result = getterMap[methodName]?.() ?? "not found";
  return result;
}

type GetterMapKeys = Lowercase<string>;
const getterMap: { [key: GetterMapKeys]: () => string } = {};

getterMap.name = () => client.chain.name;
getterMap.address = () => deployer;
getterMap.name = () => name;
