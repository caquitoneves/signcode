import type {
  AnswerInput,
  EvaluatableExercise,
  Evaluator,
  EvaluationResult,
} from './evaluator.interface';

export const multipleChoiceEvaluator: Evaluator = {
  type: 'MULTIPLE_CHOICE',
  evaluate(exercise: EvaluatableExercise, answer: AnswerInput): EvaluationResult {
    const chosen = exercise.options.find((o) => o.id === answer.optionId);
    return { correct: Boolean(chosen?.isCorrect) };
  },
};
