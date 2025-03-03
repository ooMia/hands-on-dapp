// import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

// async function fetchResult(path: string): Promise<string> {
//   const url =
//     process.env.NEXT_PHASE === PHASE_DEVELOPMENT_SERVER
//       ? `http://localhost:3000/${path}`
//       : `https://oomia.github.io/${path}`;
//   const tempResponse = (status: number) =>
//     new Response(JSON.stringify({ result: "Error on fetch" }), {
//       status: status,
//     });
//   const response = await fetch(url)
//     .catch((error) => {
//       console.error(`Error on fetch ${url}:`, error);
//       return tempResponse(500);
//     })
//     .then((response) => {
//       if (!response.ok) {
//         console.error(`Error on fetch ${url}:`, response);
//         return tempResponse(response.status);
//       }
//       return response;
//     });
//   const json = await response.json();
//   return json.result;
// }

// // eslint-disable-next-line  @typescript-eslint/no-unused-vars
// async function Title() {
//   const title = await fetchResult("api/name");

//   return <div id="greeter">Hello, {title}!</div>;
// }

// // eslint-disable-next-line  @typescript-eslint/no-unused-vars
// async function Config() {
//   const chain = await fetchResult("api/config/chain");
//   const address = await fetchResult("api/config/address");
//   const name = await fetchResult("api/config/name");
//   const next_phase = await fetchResult("api/config/next_phase");

//   return (
//     <div id="config">
//       <div>Chain: {chain}</div>
//       <div>Address: {address}</div>
//       <div>Name: {name}</div>
//       <div>Next Phase: {next_phase}</div>
//     </div>
//   );
// }
