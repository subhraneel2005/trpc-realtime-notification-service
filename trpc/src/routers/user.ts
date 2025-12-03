import { z } from "zod";

import { TRPCError } from "@trpc/server";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { decodeJwt, signJwt } from "../helpers/jwt";

export const userRouter = router({
  add: publicProcedure
    .input(
      z.object({
        username: z.string().min(3).max(20),
        pfp: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newUser = await ctx.prisma.user.create({
        data: {
          username: input.username,
          pfp: input.pfp,
        },
      });

      const token = signJwt({
        id: newUser.id,
        username: newUser.username,
        pfp: newUser.pfp,
      });

      return {
        user: newUser,
        token: token,
      };
    }),

  getById: privateProcedure.query(async ({ ctx }) => {
    const decodedUser = decodeJwt(ctx.token);
    const userId = decodedUser?.id;

    if (!userId)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User ID not found in token",
      });

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found in database",
      });

    return user;
  }),
});

export type UserRouter = typeof userRouter;
