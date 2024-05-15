import { ZodError, z } from "zod";
import { ToyotaClient } from "./ToyotaClient.js";
import { DealershipResponseBody } from "./types.js";
import {writeFileSync} from "node:fs"

const client = new ToyotaClient();

// async function test() {
//   return await client.getDealerships<
//     Promise<{
//       dealers: DealershipResponseBody["dealers"];
//       queriedZipCodes?: string[];
//     }>
//   >(53075, async function (data: DealershipResponseBody) {
//     // Grab dealerships from a different zip code
//     const moreDealerships: DealershipResponseBody = await client.getDealerships(
//       48101
//     );

//     return {
//       // Combine the dealerships returned from both requests
//       dealers: [...(data.dealers || []), ...(moreDealerships.dealers || [])],
//       queriedZipCode: [data.searchZipCode, moreDealerships.searchZipCode],
//     };
//   });
// }

// (async () => {
//     console.log(await test())
// })()

async function test() {
  try {
    console.log(await client.getVehicle("sienn", 2024))
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.log(err.errors)
    }
  }
}


(async () => {
    await test()
})()