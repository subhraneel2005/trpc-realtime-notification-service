import { publicProcedure, router } from "../index";

export const userRouter = router({
  greeting: publicProcedure.query(() => "hello world trpc"),
  info: publicProcedure.query(({ ctx }) => {
    return {
      name: "kalachuda",
      token: ctx.token,
    };
  }),
});

export type UserRouter = typeof userRouter;
