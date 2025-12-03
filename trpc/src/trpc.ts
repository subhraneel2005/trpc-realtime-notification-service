import { initTRPC, TRPCError } from "@trpc/server";
import { verifyJwt } from "./helpers/jwt";
import { Context } from "./context";

const t = initTRPC.context<Context>().create();

export const router = t.router;

const isAuthed = t.middleware(({ ctx, next }) => {
  const { req } = ctx;

  const token = req.headers.get("authorization");

  if (!token)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "No token provided",
    });

  const isValidToken = verifyJwt(token);

  if (!isValidToken)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "Invalid token",
    });

  return next({
    ctx: {
      token,
    },
  });
});

export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuthed);
