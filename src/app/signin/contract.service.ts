import { Injectable } from '@angular/core';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root'
})
export class ContractService {
  private contract!: ethers.Contract;
  private signer: any;

  private abi = [
    {
      "constant": true,
      "inputs": [
        { "name": "_owner", "type": "address" }
      ],
      "name": "balanceOf",
      "outputs": [
        { "name": "balance", "type": "uint256" }
      ],
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        { "name": "_to", "type": "address" },
        { "name": "_value", "type": "uint256" }
      ],
      "name": "transfer",
      "outputs": [],
      "type": "function"
    }
  ];

  private contractAddress = '0x4E470dc7321E84CA96FcAEDD0C8aBCebbAEB68C6';
  constructor() { }

  /**
   * 
   * @param signer 
   */
  setSigner(signer: any) {
    this.signer = signer;
    const provider = signer.providedIn;
    this.contract = new ethers.Contract(this.contractAddress, this.abi, provider);
  }

  /**
   * 
   * @param address 
   * @returns 
   */
  async getBalance(address: string): Promise<string> {
    try {
      const balance = await this.contract['balanceOf'](address);
      return ethers.utils.formatEther(balance)

    } catch (error) {
      console.error('error fetching balance', error);
      throw error;
    }
  }
  /**
   * 
   * @param toAddress 
   * @param amount 
   * @returns 
   */
  async transferTokens(toAddress: string, amount: string): Promise<string> {
    try {
      const amountInWei = ethers.utils.parseEther(amount);
      const tx = await this.contract['transfer'](toAddress, amountInWei);
      console.log("transaction", tx);
      return tx;
    } catch (error) {
      console.error('error transaction', error);
      throw error;
    }
  }
}

