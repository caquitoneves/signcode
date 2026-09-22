import type { EvaluatableExercise } from './evaluator.interface';
import { resolveEvaluator } from './index';

describe('evaluators', () => {
  describe('MULTIPLE_CHOICE', () => {
    const exercise: EvaluatableExercise = {
      type: 'MULTIPLE_CHOICE',
      acceptedAnswers: [],
      options: [
        { id: 'a', isCorrect: false },
        { id: 'b', isCorrect: true },
      ],
    };
    const evaluator = resolveEvaluator('MULTIPLE_CHOICE');

    it('acerta ao escolher a opção correta', () => {
      expect(evaluator.evaluate(exercise, { optionId: 'b' }).correct).toBe(true);
    });
    it('erra ao escolher opção incorreta', () => {
      expect(evaluator.evaluate(exercise, { optionId: 'a' }).correct).toBe(false);
    });
    it('erra sem opção', () => {
      expect(evaluator.evaluate(exercise, {}).correct).toBe(false);
    });
  });

  describe('FILL_BLANK', () => {
    const exercise: EvaluatableExercise = {
      type: 'FILL_BLANK',
      acceptedAnswers: ['variável', 'variavel'],
      options: [],
    };
    const evaluator = resolveEvaluator('FILL_BLANK');

    it('aceita resposta exata', () => {
      expect(evaluator.evaluate(exercise, { text: 'variável' }).correct).toBe(true);
    });
    it('é tolerante a acento, caixa e espaços', () => {
      expect(evaluator.evaluate(exercise, { text: '  VARIAVEL ' }).correct).toBe(true);
    });
    it('erra resposta diferente', () => {
      expect(evaluator.evaluate(exercise, { text: 'função' }).correct).toBe(false);
    });
    it('erra resposta vazia', () => {
      expect(evaluator.evaluate(exercise, { text: '   ' }).correct).toBe(false);
    });
  });
});
