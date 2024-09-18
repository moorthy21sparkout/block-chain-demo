import { Component } from '@angular/core';
import { Web3Service } from '../web3.service';
import { ContractService } from '../../contract.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  address: string | null = null;
  balance: string | null = null;
  
  constructor(private web3Service: Web3Service,
    private contractService: ContractService
  ) { }

  //connect Wallet via web3Model

  async connectWallet() {
    try {
      this.address = await this.web3Service.conectWallet();
      this.contractService.setSigner(this.web3Service['signer']);
    } catch (error) {
      console.error("error connecting wallet", error);
    }
  }
/**
 * disconnectt the wallet
 */
  disconnectWallet() {
    this.web3Service.disconnectWallet();
    this.address = null;
    this.balance = null;
  }

  /**
   * get the balance for the wallet
   */
  async getBalanceWallet() {
    if (this.address) {
      try {
        this.balance = await this.contractService.getBalance(this.address)
      } catch (error) {
        console.error("error featching balance", error);
      }
    }
  }

/**
 * get the transfer the data
 */
  async transferToken() {
    if (this.address) {
      try {
        const receipt = await this.contractService.transferTokens('0xRecipientAddress', '1');
        console.log('transfer receipt', receipt);
      } catch (error) {
        console.error('error transfer tokens', error);
      }
    }
  }
}
