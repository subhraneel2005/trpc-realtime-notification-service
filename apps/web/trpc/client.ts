import { AppRouter } from "@repo/trpc";
import { createTRPCReact } from "@trpc/react-query";

export const trpc: ReturnType<typeof createTRPCReact<AppRouter>> =
  createTRPCReact<AppRouter>({});
