/*
  Warnings:

  - You are about to drop the column `accepted` on the `FriendRequest` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderId,receiverId]` on the table `FriendRequest` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "FriendRequest" DROP COLUMN "accepted";

-- CreateIndex
CREATE UNIQUE INDEX "FriendRequest_senderId_receiverId_key" ON "FriendRequest"("senderId", "receiverId");
