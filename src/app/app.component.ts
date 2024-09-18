import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { WalletComponent } from './wallet/wallet.component';
import { CommonModule } from '@angular/common';
import { BalanceComponent } from './balance/balance.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,WalletComponent,CommonModule,BalanceComponent,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'block-chain-demo';
}
