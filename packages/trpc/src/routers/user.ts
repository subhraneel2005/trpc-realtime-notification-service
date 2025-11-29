import { publicProcedure, router } from "../index";

export const userRouter = router({
  greeting: publicProcedure.query(() => "hello world trpc"),
});

export type UserRouter = typeof userRouter;
