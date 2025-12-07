import z from "zod";
import { privateProcedure, publicProcedure, router } from "../trpc";
import { decodeJwt } from "../helpers/jwt";

export const postRouter = router({
  create: privateProcedure
    .input(
      z.object({
        content: z.string().min(1).max(280),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const decodedUser = decodeJwt(ctx.token);
      const userId = decodedUser?.id;

      const newPost = await ctx.prisma.post.create({
        data: {
          content: input.content,
          userId: userId!,
        },
      });

      return newPost;
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const posts = await ctx.prisma.post.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        _count: {
          select: {
            likes: true,
          },
        },
        user: {
          select: {
            pfp: true,
            username: true,
          },
        },
      },
    });

    return posts;
  }),

  like: privateProcedure
    .input(
      z.object({
        postId: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const userId = decodeJwt(ctx.token)?.id;
      const postId = input.postId;

      const existingLike = await ctx.prisma.likes.findUnique({
        where: {
          postId_userId: {
            postId,
            userId: userId!,
          },
        },
      });

      if (existingLike) {
        return {
          success: false,
          message: "User has already liked this post",
        };
      }

      await ctx.prisma.likes.create({
        data: {
          postId,
          userId: userId!,
        },
      });

      return {
        success: true,
        message: "Post liked successfully",
      };
    }),
});
