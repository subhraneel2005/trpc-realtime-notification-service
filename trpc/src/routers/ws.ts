import z from "zod";
import { privateProcedure, router } from "../trpc";

const WS_SERVER_URL = process.env.WS_SERVER_URL || "ws://localhost:8080";

export const wsRouter = router({
  connectUserToWSS: privateProcedure
    .input(
      z.object({
        type: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const ws = new WebSocket(WS_SERVER_URL);
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            type: input.type,
            userId: input.userId,
          })
        );
      };
      ws.onmessage = (event) => {
        console.log("Message from trpc server ", event.data);
      };
    }),
  likePostWSS: privateProcedure
    .input(
      z.object({
        event: z.string(),
        userId: z.string(),
        postId: z.string(),
        authorId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const ws = new WebSocket(WS_SERVER_URL);
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            type: input.event,
            userId: input.userId,
            postId: input.postId,
            authorId: input.authorId,
          })
        );
      };
      ws.onmessage = (event) => {
        console.log("Message from trpc server ", event.data);
      };
    }),
});
