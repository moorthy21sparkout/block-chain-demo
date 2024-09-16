import { Component } from '@angular/core';
import { WalletService } from '../wallet.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-wallet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wallet.component.html',
  styleUrl: './wallet.component.css'
})
export class WalletComponent {
  provider$?: Observable<any>;
  constructor(private walletService: WalletService) { }

  connect() {
    this.walletService.connectWallet();
  }

  disconnect() {
    this.walletService.disconnectWallet();
  }
}
