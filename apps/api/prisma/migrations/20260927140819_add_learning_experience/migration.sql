-- CreateEnum
CREATE TYPE "ProjectKind" AS ENUM ('MINI', 'FINAL');

-- CreateEnum
CREATE TYPE "AssessmentPhase" AS ENUM ('BEFORE', 'AFTER');

-- CreateEnum
CREATE TYPE "AssessmentQuestionKind" AS ENUM ('SINGLE_CHOICE', 'TEXT', 'SCALE');

-- CreateTable
CREATE TABLE "challenges" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "lessonId" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,
    "starterCode" TEXT NOT NULL,
    "tests" JSONB NOT NULL,
    "languageCode" TEXT NOT NULL DEFAULT 'js',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge_submissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "challengeId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "challenge_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "projects" (
    "id" TEXT NOT NULL,
    "kind" "ProjectKind" NOT NULL DEFAULT 'MINI',
    "moduleId" TEXT,
    "courseId" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL,
    "brief" TEXT NOT NULL,
    "requirements" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_submissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "repoUrl" TEXT,
    "liveUrl" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkpoints" (
    "id" TEXT NOT NULL,
    "moduleId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "checkpoints_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkpoint_questions" (
    "id" TEXT NOT NULL,
    "checkpointId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "prompt" TEXT NOT NULL,
    "explanation" TEXT,

    CONSTRAINT "checkpoint_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkpoint_options" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "text" TEXT NOT NULL,
    "isCorrect" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "checkpoint_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "checkpoint_attempts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "checkpointId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "total" INTEGER NOT NULL,
    "passed" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "checkpoint_attempts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessments" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assessments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_questions" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "kind" "AssessmentQuestionKind" NOT NULL DEFAULT 'SINGLE_CHOICE',
    "prompt" TEXT NOT NULL,

    CONSTRAINT "assessment_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_options" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "text" TEXT NOT NULL,

    CONSTRAINT "assessment_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assessment_responses" (
    "id" TEXT NOT NULL,
    "assessmentId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "phase" "AssessmentPhase" NOT NULL DEFAULT 'BEFORE',
    "answers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "assessment_responses_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "challenges_moduleId_idx" ON "challenges"("moduleId");

-- CreateIndex
CREATE INDEX "challenges_lessonId_idx" ON "challenges"("lessonId");

-- CreateIndex
CREATE INDEX "challenge_submissions_userId_idx" ON "challenge_submissions"("userId");

-- CreateIndex
CREATE INDEX "challenge_submissions_challengeId_idx" ON "challenge_submissions"("challengeId");

-- CreateIndex
CREATE INDEX "projects_moduleId_idx" ON "projects"("moduleId");

-- CreateIndex
CREATE INDEX "projects_courseId_idx" ON "projects"("courseId");

-- CreateIndex
CREATE INDEX "project_submissions_userId_idx" ON "project_submissions"("userId");

-- CreateIndex
CREATE INDEX "project_submissions_projectId_idx" ON "project_submissions"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "project_submissions_userId_projectId_key" ON "project_submissions"("userId", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "checkpoints_moduleId_key" ON "checkpoints"("moduleId");

-- CreateIndex
CREATE INDEX "checkpoint_questions_checkpointId_idx" ON "checkpoint_questions"("checkpointId");

-- CreateIndex
CREATE INDEX "checkpoint_options_questionId_idx" ON "checkpoint_options"("questionId");

-- CreateIndex
CREATE INDEX "checkpoint_attempts_userId_idx" ON "checkpoint_attempts"("userId");

-- CreateIndex
CREATE INDEX "checkpoint_attempts_checkpointId_idx" ON "checkpoint_attempts"("checkpointId");

-- CreateIndex
CREATE UNIQUE INDEX "assessments_courseId_key" ON "assessments"("courseId");

-- CreateIndex
CREATE INDEX "assessment_questions_assessmentId_idx" ON "assessment_questions"("assessmentId");

-- CreateIndex
CREATE INDEX "assessment_options_questionId_idx" ON "assessment_options"("questionId");

-- CreateIndex
CREATE INDEX "assessment_responses_assessmentId_idx" ON "assessment_responses"("assessmentId");

-- CreateIndex
CREATE UNIQUE INDEX "assessment_responses_userId_assessmentId_phase_key" ON "assessment_responses"("userId", "assessmentId", "phase");

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenges" ADD CONSTRAINT "challenges_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_submissions" ADD CONSTRAINT "challenge_submissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "challenge_submissions" ADD CONSTRAINT "challenge_submissions_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_submissions" ADD CONSTRAINT "project_submissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_submissions" ADD CONSTRAINT "project_submissions_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkpoints" ADD CONSTRAINT "checkpoints_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkpoint_questions" ADD CONSTRAINT "checkpoint_questions_checkpointId_fkey" FOREIGN KEY ("checkpointId") REFERENCES "checkpoints"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkpoint_options" ADD CONSTRAINT "checkpoint_options_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "checkpoint_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkpoint_attempts" ADD CONSTRAINT "checkpoint_attempts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "checkpoint_attempts" ADD CONSTRAINT "checkpoint_attempts_checkpointId_fkey" FOREIGN KEY ("checkpointId") REFERENCES "checkpoints"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessments" ADD CONSTRAINT "assessments_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_questions" ADD CONSTRAINT "assessment_questions_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "assessments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_options" ADD CONSTRAINT "assessment_options_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "assessment_questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_responses" ADD CONSTRAINT "assessment_responses_assessmentId_fkey" FOREIGN KEY ("assessmentId") REFERENCES "assessments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assessment_responses" ADD CONSTRAINT "assessment_responses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
