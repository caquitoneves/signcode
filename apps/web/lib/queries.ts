'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from './api';
import { exercisesApi } from './exercises-api';
import { experienceApi } from './experience-api';
import { progressApi } from './progress-api';

/** Fábrica de chaves de cache — centraliza para facilitar invalidação. */
export const qk = {
  courses: () => ['courses'] as const,
  course: (slug: string) => ['course', slug] as const,
  lesson: (id: string) => ['lesson', id] as const,
  courseProgress: (slug: string) => ['course-progress', slug] as const,
  dashboard: () => ['dashboard'] as const,
  portfolio: () => ['portfolio'] as const,
  checkpoint: (id: string) => ['checkpoint', id] as const,
  project: (id: string) => ['project', id] as const,
  projectSubmission: (id: string) => ['project-submission', id] as const,
  challenge: (id: string) => ['challenge', id] as const,
  assessment: (slug: string) => ['assessment', slug] as const,
  assessmentStatus: (slug: string) => ['assessment-status', slug] as const,
  lessonExercises: (id: string) => ['lesson-exercises', id] as const,
};

export function useCourses() {
  return useQuery({ queryKey: qk.courses(), queryFn: () => api.listCourses() });
}

export function useCourse(slug: string) {
  return useQuery({
    queryKey: qk.course(slug),
    queryFn: () => api.getCourse(slug),
    enabled: Boolean(slug),
  });
}

export function useLesson(id: string) {
  return useQuery({
    queryKey: qk.lesson(id),
    queryFn: () => api.getLesson(id),
    enabled: Boolean(id),
  });
}

export function useCourseProgress(slug: string, enabled = true) {
  return useQuery({
    queryKey: qk.courseProgress(slug),
    queryFn: () => progressApi.getCourseProgress(slug),
    enabled: enabled && Boolean(slug),
  });
}

export function useDashboard(enabled = true) {
  return useQuery({ queryKey: qk.dashboard(), queryFn: () => progressApi.getDashboard(), enabled });
}

export function usePortfolio(enabled = true) {
  return useQuery({
    queryKey: qk.portfolio(),
    queryFn: () => progressApi.getPortfolio(),
    enabled,
  });
}

export function useCheckpoint(id: string) {
  return useQuery({
    queryKey: qk.checkpoint(id),
    queryFn: () => experienceApi.getCheckpoint(id),
    enabled: Boolean(id),
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: qk.project(id),
    queryFn: () => experienceApi.getProject(id),
    enabled: Boolean(id),
  });
}

export function useProjectSubmission(id: string, enabled = true) {
  return useQuery({
    queryKey: qk.projectSubmission(id),
    queryFn: () => experienceApi.getProjectSubmission(id),
    enabled: enabled && Boolean(id),
  });
}

export function useChallenge(id: string) {
  return useQuery({
    queryKey: qk.challenge(id),
    queryFn: () => experienceApi.getChallenge(id),
    enabled: Boolean(id),
  });
}

export function useAssessment(slug: string) {
  return useQuery({
    queryKey: qk.assessment(slug),
    queryFn: () => experienceApi.getAssessment(slug),
    enabled: Boolean(slug),
  });
}

export function useAssessmentStatus(slug: string, enabled = true) {
  return useQuery({
    queryKey: qk.assessmentStatus(slug),
    queryFn: () => experienceApi.getAssessmentStatus(slug),
    enabled: enabled && Boolean(slug),
  });
}

export function useLessonExercises(id: string) {
  return useQuery({
    queryKey: qk.lessonExercises(id),
    queryFn: () => exercisesApi.listForLesson(id),
    enabled: Boolean(id),
  });
}
