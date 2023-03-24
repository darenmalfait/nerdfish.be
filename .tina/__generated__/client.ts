import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: 'f29e4788b013db4cd8bce48791504a44b5912555', queries });
export default client;
  