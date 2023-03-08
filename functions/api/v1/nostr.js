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
  if (request.method === "POST") {
    console.info("Method is POST");
    return await handlePost(request, env);
  } else {
    console.error("Error method not allowed");
    return new Response(
      JSON.stringify({ ok: false, status: "Error method not allowed" }),
      {
        status: 405,
        statusText: "Method not allowed",
      }
    );
  }
}

async function handlePost(request, env) {
  console.info("handlePost");
  const { NAMES } = env;
  let name = "";
  let key = "";

  try {
    const body = await request.json();
    name = body.name;
    key = body.key;

    const existingKey = await NAMES.get(name);

    if (existingKey) {
      // status = true, name already exists
      return new Response(JSON.stringify({ status: "Name already exists" }), {
        status: 400,
        statusText: "Name already exists",
      });
    } else {
      // status = false, name does not exist
      try {
        await NAMES.put(name, key);
        return new Response(
          JSON.stringify({
            ok: true,
            status: "Success",
          }),
          {
            status: 200,
            statusText: "Success",
            headers: {
              "Content-Type": "application/json;charset=utf-8",
              "Access-Control-Allow-Origin": "*",
            },
          }
        );
      } catch (err) {
        console.error("Error adding to store: ", err);
        return new Response(
          JSON.stringify({ ok: false, status: "Error adding to store" }),
          {
            status: 500,
            statusText: "Error adding to store: ",
            err,
          }
        );
      }
    }
  } catch (err) {
    console.error("Error parsing body: ", err);
    return new Response(JSON.stringify({ ok: false, status: "Invalid body" }), {
      status: 400,
      statusText: "Invalid body",
    });
  }
  try {
  } catch (err) {
    console.error("Error checking store: ", err);
    return new Response(
      JSON.stringify({ ok: false, status: "Error checking store" }),
      {
        status: 500,
        statusText: "Error checking store: ",
        err,
      }
    );
  }
}
