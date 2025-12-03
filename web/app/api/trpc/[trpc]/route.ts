import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { createContext } from "../../../../../trpc/src/context";
import { appRouter } from "../../../../../trpc/src/router";

const handler = (req: Request) =>
  fetchRequestHandler({
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext,
  });

export { handler as GET, handler as POST };
