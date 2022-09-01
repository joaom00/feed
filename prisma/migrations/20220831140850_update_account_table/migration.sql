/*
  Warnings:

  - You are about to alter the column `refresh_token` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2000)`.
  - You are about to alter the column `access_token` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2000)`.
  - You are about to alter the column `id_token` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2000)`.
  - You are about to alter the column `session_state` on the `Account` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2000)`.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "oauth_token" VARCHAR(2000),
ADD COLUMN     "oauth_token_secret" VARCHAR(2000),
ALTER COLUMN "refresh_token" SET DATA TYPE VARCHAR(2000),
ALTER COLUMN "access_token" SET DATA TYPE VARCHAR(2000),
ALTER COLUMN "id_token" SET DATA TYPE VARCHAR(2000),
ALTER COLUMN "session_state" SET DATA TYPE VARCHAR(2000);
