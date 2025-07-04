import CodeHighlight from "@/component/CodeHighlight";
import { helloWorldAddress, helloWorldName } from "@/module/contracts";
import { client, deployer } from "@/module/environment";

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

getterMap.chain = () => client.chain.name;
getterMap.deployer = () => deployer;
getterMap.contract_address = () => helloWorldAddress ?? "";
getterMap.name = () => helloWorldName ?? "";
