import { serve } from "https://deno.land/std/http/server.ts";
import {serveDir} from "https://deno.land/std/http/file_server.ts";
import { open } from "https://deno.land/x/opener/mod.ts";

async function handler(req: Request) {
    const response = await serveDir(req);
    return response;
  }

await open("http://localhost:8080/index.html");
const server = serve(handler, { port: 8080 });
console.log("local server @ http://localhost:8080/");

// deno compile --target x86_64-pc-windows-msvc -o windows.exe --allow-read --allow-net --allow-run utils/local-server.ts
// deno compile --target x86_64-apple-darwin -o mac --allow-read --allow-net --allow-run utils/local-server.ts
// deno compile --target aarch64-apple-darwin -o mac_arm --allow-read --allow-net --allow-run utils/local-server.ts
// deno compile --target x86_64-unknown-linux-gnu -o linux --allow-read --allow-net --allow-run utils/local-server.ts