import { Injectable, signal } from '@angular/core';
import type { InvestmentInput } from './investment.model';
import type { Results } from './results.model';
@Injectable({ providedIn: 'root' })
export class InvestmentService {
  resultsData = signal<Results[] | undefined>(undefined);

  calculateInvestmentResults(data: InvestmentInput) {
    const { expectedReturn, initialInvestment, annualInvestment, duration } =
      data;
    const annualData = [];
    let investmentValue = initialInvestment;

    for (let i = 0; i < duration; i++) {
      const year = i + 1;
      const interestEarnedInYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInYear + annualInvestment;
      const totalInterest =
        investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year,
      });
    }
    // this.resultsData = annualData;
    this.resultsData.set(annualData);
  }
}
