import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentService } from '../investment.service';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  private investmentService = inject(InvestmentService);

  enterdintialInvestment = signal('0');
  enterdannualInvestment = signal('0');
  enterdexpectedRetrun = signal('0');
  enterdduration = signal('0');

  onSubmit() {
    this.investmentService.calculateInvestmentResults({
      annualInvestment: +this.enterdannualInvestment(),
      initialInvestment: +this.enterdintialInvestment(),
      expectedReturn: +this.enterdexpectedRetrun(),
      duration: +this.enterdduration(),
    });

    this.enterdintialInvestment.set('0');
    this.enterdannualInvestment.set('0');
    this.enterdexpectedRetrun.set('0');
    this.enterdduration.set('0');
  }
}
