import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { prisma } from "./prisma/prisma";

export async function createContext(opts: FetchCreateContextFnOptions) {
  return {
    req: opts.req,
    prisma,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>;
