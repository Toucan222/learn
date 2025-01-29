import { Teacher, Lesson } from '@/types';
import { PayrollPeriod, WageCalculation } from './types';

export class PayrollCalculator {
  calculateWages(
    teacher: Teacher,
    lessons: Lesson[],
    startDate: Date,
    endDate: Date
  ): WageCalculation {
    const calculation: WageCalculation = {
      regularHours: 0,
      premiumHours: 0,
      baseRate: teacher.wageRate,
      premiumRate: teacher.wageRate * (1 + (teacher.wagePremium || 0)),
      totalRegular: 0,
      totalPremium: 0,
      total: 0,
    };

    lessons.forEach(lesson => {
      const hours = (lesson.endTime.getTime() - lesson.startTime.getTime()) / (1000 * 60 * 60);
      
      if (lesson.wagePremium) {
        calculation.premiumHours += hours;
        calculation.totalPremium += hours * calculation.premiumRate;
      } else {
        calculation.regularHours += hours;
        calculation.totalRegular += hours * calculation.baseRate;
      }
    });

    calculation.total = calculation.totalRegular + calculation.totalPremium;
    return calculation;
  }

  handleCancellation(lesson: Lesson, cancellationPayPercentage: number): number {
    const hours = (lesson.endTime.getTime() - lesson.startTime.getTime()) / (1000 * 60 * 60);
    const baseAmount = hours * lesson.price;
    return baseAmount * (cancellationPayPercentage / 100);
  }
}

export const payrollCalculator = new PayrollCalculator();
