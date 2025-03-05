import { client, deployer } from "@/config/[slug]/environment";

async function parseInternalAPI(path: string) {
  const host = "http://localhost:3000";

  //   const host = "https://oomia.github.io/hands-on-dapp";
  const response = await fetch(`${host}/api/${path}`);
  const text = await response.text();
  try {
    // regex
    // 1. html div tag
    // 2. which id = result
    // 3. can have any other props or children
    // find and extract inner text
    const regex = /<div id="result">[\s\S]*?{<\/span>([\s\S]*?)<\/code>/;
    const regexResult = regex.exec(text);

    // extract inner text
    // 1. all inner text located inside from tag end '>' to tag start '<'
    // e.g. <div>i love</div><div>you</div> => [i love, you]
    // 2. concat all inner text
    // e.g. [i love, you] => i love you
    // 3. replace quote {&quot;result&quot;:&quot;World&quot;} => {"result":"World"}

    const stringifyJsonResult =
      "{" +
      regexResult![1]
        .split(">")
        .map((text) => text.split("<")[0])
        .join("")
        .replace(/&quot;/g, '"');

    console.log(stringifyJsonResult);

    return JSON.parse(stringifyJsonResult).result;
  } catch (error) {
    console.error("Error parsing internal API:", error);
    return "Error";
  }
}

// using experimental feature
const name = await parseInternalAPI("config/name");

export async function Title() {
  return <div id="greeter">Hello, {name}!</div>;
}

export async function Config() {
  return (
    <div id="config">
      <div>Chain: {client.chain.name}</div>
      <div>Address: {deployer}</div>
      <div>Name: {name}</div>
    </div>
  );
}
