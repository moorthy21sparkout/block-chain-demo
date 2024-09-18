import { Injectable } from '@angular/core';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { walletconnect } from 'web3modal/dist/providers/connectors';
import { ethers } from 'ethers';
@Injectable({
  providedIn: 'root'
})
export class Web3Service {

  private provider: any;
  private web3Modal!:Web3Modal
  private signer:any;
  constructor() { 
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "1234567890abcdef1234567890abcdef", // required
        }
      }
    };
    this.web3Modal = new Web3Modal({
      cacheProvider: true, // optional
      providerOptions, // required
    });
  }
/**
 * 
 * @returns 
 * connect the walllet
 */
  async conectWallet() {
    try{
 this.provider = await this.web3Modal.connect();
 const etherProvider = new ethers.providers.Web3Provider(this.provider);
 this.signer = etherProvider.getSigner();
 const address = await this.signer.getAddress();
 console.log("wallet address is",address);
 return address;
    }catch(error){
      console.error("wollet connect error",error);
    }

  }
  /**
   * disconnect the wallet
   */
  async disconnectWallet(){
    this.web3Modal.clearCachedProvider();
    this.provider = null;
    this.signer = null;
  }
}
