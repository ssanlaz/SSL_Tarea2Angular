import { Component, EventEmitter, Output, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { IProducts } from '../../interface/iproducts';

@Component({
  selector: 'app-products-filter',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './products-filter.component.html',
  styleUrl: './products-filter.component.css'
})


export class ProductsFilterComponent {

  @Output() filtrarProductos = new EventEmitter<{ 
    name: string;
    category: string;
    price: number | null;
    active: boolean;
  }>(); //Emitimos los filtros al padre

  filtro ={
    name: '',
    category :'',
    price: null,
    active: false,
  };


//metodo para filtrar

getDataFilter(miFiltro : NgForm): void {
this.filtrarProductos.emit(this.filtro);
miFiltro.reset();
}

//Metodo para deshacer el filtro de busqueda
resetear() : void {
  this.filtro = {
    name : '',
    category: '',
    price: null,
    active: false,
  };
  this.filtrarProductos.emit(this.filtro);
  }

}
