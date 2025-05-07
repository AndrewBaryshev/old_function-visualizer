import { evaluate } from 'mathjs'

/**
 * Безопасно вычисляет значение математической формулы
 * @param formula - Строка с математической формулой
 * @param x - Значение переменной x для подстановки в формулу
 * @returns Результат вычисления формулы
 */
export function evaluateFormula(formula: string, x: number): number {
  try {
    const processedFormula = formula.replace(/\*\*/g, '^')

    const scope = {
      x: x,
    }

    const result = evaluate(processedFormula, scope)
    return Number(result)
  } catch (error) {
    console.error('Ошибка при вычислении формулы:', error)
    console.error('Формула:', formula)
    console.error('x =', x)

    return 0
  }
}
