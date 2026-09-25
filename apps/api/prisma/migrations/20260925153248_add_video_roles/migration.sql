/*
  Warnings:

  - A unique constraint covering the columns `[lessonId,role]` on the table `lesson_videos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "LessonVideoRole" AS ENUM ('CONTENT', 'INSTRUCTOR', 'INTERPRETER');

-- DropIndex
DROP INDEX "lesson_videos_lessonId_languageCode_key";

-- AlterTable
ALTER TABLE "lesson_videos" ADD COLUMN     "role" "LessonVideoRole" NOT NULL DEFAULT 'CONTENT';

-- CreateIndex
CREATE UNIQUE INDEX "lesson_videos_lessonId_role_key" ON "lesson_videos"("lessonId", "role");
