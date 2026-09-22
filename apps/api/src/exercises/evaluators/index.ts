import type { Evaluator, ExerciseKind } from './evaluator.interface';
import { fillBlankEvaluator } from './fill-blank.evaluator';
import { multipleChoiceEvaluator } from './multiple-choice.evaluator';

const REGISTRY: Record<ExerciseKind, Evaluator> = {
  MULTIPLE_CHOICE: multipleChoiceEvaluator,
  FILL_BLANK: fillBlankEvaluator,
};

export function resolveEvaluator(type: ExerciseKind): Evaluator {
  return REGISTRY[type];
}

export * from './evaluator.interface';
