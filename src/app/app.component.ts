import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WalletComponent } from './wallet/wallet.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,WalletComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'block-chain-demo';
}
