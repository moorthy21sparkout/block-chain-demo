import { Component } from '@angular/core';
import { ContractService } from '../contract.service';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent {
  address: string = '';   // The Ethereum address entered by the user
  balance: string = '';   // The balance to be displayed
  loading: boolean = false;
  error: string = '';

  constructor(private contarctService: ContractService) { }

  setDemoAddress() {
    this.address = '0x742d35Cc6634C0532925a3b844Bc454e4438f44e';  // Set the demo Ethereum address
  }
  async getBalance() {
    this.loading = true;
    this.error = '';
    try {
      this.balance = await this.contarctService.getBalance(this.address)
    } catch (error) {
      this.error = 'failed to featch balance'
      console.log(error);
    } finally {
      this.loading = false;
    }
  }
}
