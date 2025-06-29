import helloWorld from "@/public/hello-world.jpeg";
import "dotenv/config";
import Image from "next/image";
import { Config, Title } from "./Hero";

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
