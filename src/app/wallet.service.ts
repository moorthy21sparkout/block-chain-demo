import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private providerSubject = new BehaviorSubject<ethers.providers.Web3Provider | null>(null);
  // private provider$ = this.providerSubject.asObservable();
  public provider$: Observable<ethers.providers.Web3Provider | null> = this.providerSubject.asObservable();
  private provider: ethers.providers.Web3Provider | null = null;

  constructor() { }
  async connectWallet() {
    if (window.ethereum) {
      const ethereumProvider = window.ethereum;
      console.log('the data is ',window.ethereum);
      
      this.provider = new ethers.providers.Web3Provider(ethereumProvider);
      this.providerSubject.next(this.provider);
      console.log("the value is ",this.providerSubject.next(this.provider));
      
      console.log(  'the data 2 is',ethereumProvider.request({ method: 'eth_requestAccounts' }));
      
      //Request account access
      
      await ethereumProvider.request({ method: 'eth_requestAccounts' });
      
      ethereumProvider.on('accountsChanged', (accounts: string[]) => {
        console.log('accounts Changed:', accounts);

      });

      ethereumProvider.on('chainChanged', (chainId: number) => {
        console.log('chaine changed:', chainId);

      });

      ethereumProvider.on('disconnect', (error: { code: number; message: string }) => {
        console.log('disconnected:', error);

        this.providerSubject.next(null);
      });
    } else {
      console.error('No Etherem Provider Found');
    }
  }
  disconnectWallet() {
    this.provider = null;
    this.providerSubject.next(null);
    console.log("disconnected account");
    
  }
}
