import { helloWorldAddress, helloWorldName } from "@/module/contracts";
import { client, deployer } from "@/module/environment";

export async function Title() {
  return <div id="greeter">Hello, {helloWorldName}!</div>;
}

export async function Config() {
  return (
    <div id="config">
      <div>Chain: {client.chain.name}</div>
      <div>Deployer: {deployer}</div>
      <div>Contract: {helloWorldAddress}</div>
      <div>Name: {helloWorldName}</div>
    </div>
  );
}
