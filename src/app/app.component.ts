import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductsListComponent } from "./components/products-list/products-list.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ProductsListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SSL_Tarea2Angular';
}
