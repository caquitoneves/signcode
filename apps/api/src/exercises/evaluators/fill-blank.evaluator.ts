import type {
  AnswerInput,
  EvaluatableExercise,
  Evaluator,
  EvaluationResult,
} from './evaluator.interface';

/** Normaliza para comparação tolerante: sem espaços nas pontas, minúsculas e sem acentos. */
function normalize(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/\s+/g, ' ');
}

export const fillBlankEvaluator: Evaluator = {
  type: 'FILL_BLANK',
  evaluate(exercise: EvaluatableExercise, answer: AnswerInput): EvaluationResult {
    const given = normalize(answer.text ?? '');
    if (given.length === 0) return { correct: false };
    const accepted = exercise.acceptedAnswers.map(normalize);
    return { correct: accepted.includes(given) };
  },
};
