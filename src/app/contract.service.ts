import { Injectable, input } from '@angular/core';
import { promises } from 'dns';
import Web3 from 'web3';

@Injectable({
  providedIn: 'root'
})
export class ContractService {


  private web3!: Web3;
  //dummy contract address (ERC-20 token contract for ethereum)
  private contractAddress = '0x4E470dc7321E84CA96FcAEDD0C8aBCebbAEB68C6';
  //dummy ABI for an ERC-20 token contract
  private abi = [
    {
      "constant": true,
      input: [
        {
          "name": "_owner",
          "type": "address"
        }
      ],
      "name": "balanceOf",
      "outputs": [
        {
          "name": "balance",
          "type": "uint256"
        }
      ],
      "type": "function",
    }
  ]
  private contract: any;

  constructor() {
    //connect to Ropsten Testnet via Infura

    this.web3 = new Web3('https://ropsten.infura.io/v3/1234567890abcdef1234567890abcdef'); //your Infura Ropsten project ID

    this.contract = new this.web3.eth.Contract(this.abi, this.contractAddress);
  }
  //function for the get the balance for the ethereum address the given ERC-20 token
  async getBalance(address:string):Promise<any>{
    console.log("Address provided:", address); 
    try {
         // Check if the address is valid before sending request
         if (!this.web3.utils.isAddress(address)){
          throw new Error("Invalid Ethereum address");
        }
      const balance = await this.contract.methods.balanceOf(address).call();
      return this.web3.utils.fromWei(balance,'ether');
    } catch (error) {
      console.error("error fethching balance",error);
      throw error;     
    }
  }
}
