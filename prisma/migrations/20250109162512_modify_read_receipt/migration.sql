/*
  Warnings:

  - The primary key for the `ReadReceipt` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `chatId` to the `ReadReceipt` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ReadReceipt" DROP CONSTRAINT "ReadReceipt_pkey",
ADD COLUMN     "chatId" TEXT NOT NULL,
ADD CONSTRAINT "ReadReceipt_pkey" PRIMARY KEY ("userId", "chatId");

-- AddForeignKey
ALTER TABLE "ReadReceipt" ADD CONSTRAINT "ReadReceipt_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
