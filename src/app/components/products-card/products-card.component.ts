import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProducts } from '../../interface/iproducts';


@Component({
  selector: 'app-products-card',
  standalone: true,
  imports: [],
  templateUrl: './products-card.component.html',
  styleUrl: './products-card.component.css'
})
export class ProductsCardComponent {

  //Tenemos input del padre al hijo y un output del metodo eliminar del hijo al padre

  @Input() miProducto !: IProducts;
  @Output() delete = new EventEmitter<string>();


//Metedo para eliminar el producto, emitiendoselo al componente padre
  onDelete() {
    this.delete.emit(this.miProducto._id);
  }
}
