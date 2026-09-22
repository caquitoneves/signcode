/**
 * Abstração de avaliação (Exercise -> Evaluator).
 * Desacoplada do Prisma de propósito: o núcleo é testável e um futuro
 * CodeEvaluator (execução isolada, em serviço separado) pluga aqui sem tocar no resto.
 */
export type ExerciseKind = 'MULTIPLE_CHOICE' | 'FILL_BLANK';

export interface EvaluatableOption {
  id: string;
  isCorrect: boolean;
}

export interface EvaluatableExercise {
  type: ExerciseKind;
  acceptedAnswers: string[];
  options: EvaluatableOption[];
}

export interface AnswerInput {
  optionId?: string;
  text?: string;
}

export interface EvaluationResult {
  correct: boolean;
}

export interface Evaluator {
  readonly type: ExerciseKind;
  evaluate(exercise: EvaluatableExercise, answer: AnswerInput): EvaluationResult;
}
