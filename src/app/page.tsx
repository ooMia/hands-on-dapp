import helloWorld from "@/public/hello-world.jpeg";
import { headers } from "next/headers";
import Image from "next/image";

async function fetchResult(path: string): Promise<string> {
  const headersList = await headers();
  const host = headersList.get("host");
  // TODO: use env to set the URL to separate dev/prod
  const url = `http://${host}/${path}`;
  return fetch(url)
    .then((res) => res.json())
    .then((data) => data.result);
}

async function Title() {
  const title = await fetchResult("api/name");

  return <div id="greeter">Hello, {title}!</div>;
}

async function Config() {
  const chain = await fetchResult("api/config/chain");
  const address = await fetchResult("api/config/address");
  const name = await fetchResult("api/config/name");
  const next_phase = await fetchResult("api/config/next_phase");

  return (
    <div id="config">
      <div>Chain: {chain}</div>
      <div>Address: {address}</div>
      <div>Name: {name}</div>
      <div>Next Phase: {next_phase}</div>
    </div>
  );
}

export default async function RootPage() {
  const banner = (
    <Image
      src={helloWorld}
      alt="hero"
      fill
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
      sizes="33vw"
      style={{ objectFit: "contain" }}
    />
  );
  return (
    <main>
      {await Title()}
      {await Config()}
      <div className="flex max-w-[50vw]">
        <div className="relative h-[50vh] w-[50vw]">{banner}</div>
      </div>
    </main>
  );
}
