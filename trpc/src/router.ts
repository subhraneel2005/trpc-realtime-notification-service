import { userRouter } from "./routers/user";
import { wsRouter } from "./routers/ws";
import { router } from "./trpc";

export const appRouter = router({
  user: userRouter,
  ws: wsRouter,
});

export type AppRouter = typeof appRouter;
