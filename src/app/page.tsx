import helloWorld from "@/public/hello-world.jpeg";
import { headers } from "next/headers";
import Image from "next/image";

async function Title() {
  const headersList = await headers();
  const host = headersList.get("host");
  // TODO: use env to set the URL to separate dev/prod
  const url = `http://${host}/api/name`;
  const title = await fetch(url)
    .then((res) => res.json())
    .then((data) => data.result);

  return <div id="greeter">Hello, {title}!</div>;
}

export default async function RootPage() {
  const title = await Title();
  const banner = (
    <Image
      src={helloWorld}
      alt="book cover"
      fill
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
      sizes="33vw"
      style={{ objectFit: "contain" }}
    />
  );
  return (
    <main>
      {title}
      <div className="flex max-w-[50vw]">
        <div className="relative h-[50vh] w-[50vw]">{banner}</div>
      </div>
    </main>
  );
}
