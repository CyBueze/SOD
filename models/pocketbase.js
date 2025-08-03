import PocketBase from "pocketbase";

const baseUrl = process.env.POCKETBASE_URL;

if (!baseUrl) {
  throw new Error("POCKETBASE_URL is not defined in your environment variables.");
}

const pb = new PocketBase(baseUrl);

export default pb;
