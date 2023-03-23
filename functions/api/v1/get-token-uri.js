export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
      "Access-Control-Max-Age": "86400",
    },
  });
}

export async function onRequest(context) {
  const { request, env } = context;

  return new Response(
    JSON.stringify({
      ok: true,
      result: "https://api.byzantion.xyz/api/meta/mutant_monkeys/4150.json",
    }),
    {
      status: 200,
      statusText: "Cache hit",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS, POST",
        "Access-Control-Max-Age": "86400",
      },
    }
  );

  // if (request.method === "GET") {
  //   return await handleGet(request, env);
  // } else {
  //   console.error("Error method not allowed");
  //   return new Response(
  //     JSON.stringify({ ok: false, status: "Error method not allowed" }),
  //     {
  //       status: 405,
  //       statusText: "Method not allowed",
  //     }
  //   );
  // }
}

async function handleGet(request, env) {
  const { TOKEN_URI } = env;

  const FUNCTION_NAME = "get-token-uri";
  const { searchParams } = new URL(request.url);
  const contractAddress = searchParams.get("contractAddress");
  const contractName = searchParams.get("contractName");
  const assetId = searchParams.get("assetId");

  return new Response(
    JSON.stringify({
      ok: true,
      result: "https://api.byzantion.xyz/api/meta/mutant_monkeys/4150.json",
    }),
    {
      status: 200,
      statusText: "Cache hit",
    }
  );

  // try {
  //   const key = `${contractAddress}.${contractName}.${assetId}`;
  //   const existingKey = await TOKEN_URI.get(key);

  //   if (existingKey) {
  //     // status = true, name already exists
  //     return new Response(JSON.stringify({ ok: true, results: existingKey }), {
  //       status: 200,
  //       statusText: "Cache hit",
  //     });
  //   } else {
  //     // status = false, name does not exist
  //     try {
  //       // call stacks contract api
  //       const url = `https://api.hiro.so/extended/v1/contract/call-read/${contractAddress}/${contractName}/get-token-uri?sender_address=${contractAddress}&arguments=${assetId}`;
  //       const response = await fetch(url);
  //       const json = await response.json();
  //       const result = json.result;
  //       await TOKEN_URI.put(key, result);
  //       return new Response(
  //         JSON.stringify({
  //           ok: true,
  //           result,
  //         }),
  //         {
  //           status: 200,
  //           statusText: "Cache add",
  //           headers: {
  //             "Content-Type": "application/json;charset=utf-8",
  //             "Access-Control-Allow-Origin": "*",
  //           },
  //         }
  //       );
  //     } catch (err) {
  //       console.error("Error adding to store: ", err);
  //       return new Response(
  //         JSON.stringify({ ok: false, result: "Error adding to store" }),
  //         {
  //           status: 500,
  //           statusText: `Error adding to store: ${err}`,
  //         }
  //       );
  //     }
  //   }
  // } catch (err) {
  //   const msg = `Error getting token uri: ${err}`;
  //   console.error(msg);
  //   return new Response(JSON.stringify({ ok: false, result: msg }), {
  //     status: 400,
  //     statusText: msg,
  //   });
  // }
}

// adding new comment to merge
