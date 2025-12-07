/*
  Warnings:

  - A unique constraint covering the columns `[postId,userId]` on the table `Likes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Likes` table without a default value. This is not possible if the table is not empty.
  - Made the column `postId` on table `Likes` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `Post` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Likes" DROP CONSTRAINT "Likes_postId_fkey";

-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_userId_fkey";

-- AlterTable
ALTER TABLE "Likes" ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "postId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "userId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Likes_postId_userId_key" ON "Likes"("postId", "userId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Likes" ADD CONSTRAINT "Likes_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
