import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

const dummyToken = "XMgqHy4HV3UvL0NCZoKJd/Sf+8S6s1UscGwfm7T6b3Y=";

export async function createContext({ req: res }: FetchCreateContextFnOptions) {
  return {
    token: dummyToken,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
