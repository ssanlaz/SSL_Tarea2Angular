import { Component, inject } from '@angular/core';
import { ProductServiceService } from '../../services/product-service.service';
import { ProductsCardComponent } from "../products-card/products-card.component";
import { IProducts } from '../../interface/iproducts';
import { ProductsFilterComponent } from "../products-filter/products-filter.component";
import { ProductsFormComponent } from "../products-form/products-form.component";

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductsCardComponent, ProductsFilterComponent, ProductsFormComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css'
})


//En nuestro componente padre tenemos importados los componentes hijos
export class ProductsListComponent {


  //Cargamos dos listas de productos, para mostrar los de la API y los nuevos dados de alta
  productos : IProducts[]; //lista de productos mostrada
  originalProductos : IProducts[]; //lista de productos original

  //Inicializamos en el constructor
  constructor(){
    this.productos= [];
   this.originalProductos = [];
  }

  //llamada al service
  private ProductServiceService = inject(ProductServiceService);




  //cargamos los productos al servicio
ngOnInit(): void {
  
const productosCargados = this.ProductServiceService.getAllProductos();
this.productos = productosCargados;
this.originalProductos = productosCargados;
//depuramos
console.log(this.productos);
console.log(this.originalProductos);

}




//Para eliminar el producto
ProductDelete($event: string) {

  this.productos = this.productos.filter((producto) => producto._id !== $event);
  this.originalProductos = this.originalProductos.filter((producto) => producto._id !== $event);
  }





//Para filtrar los productos por nombre, categoria, precio o si estan activos
  filtrar(filtros : {

    name : string;
    category: string;
    price : number | null;
    active: boolean;
  }):void{


    //restaurar la lista original de los productos
 this.productos= [...this.originalProductos];

  //Filtramos la lista de productos 
  this.productos = this.productos.filter((producto) =>{

    const nombre = !filtros.name || producto.name.toLowerCase().includes(filtros.name.toLowerCase());
    const categoria = !filtros.category || producto.category == filtros.category;
    const precio = !filtros.price || producto.price <= filtros.price;
    const activo = !filtros.active || producto.active == filtros.active;

    return nombre && categoria && precio && activo;
   });

   //depuramos
   console.log(this.originalProductos);
   console.log(this.productos);
  
    }





//Para añadir un producto nuevo a la lista 
    addProduct(newProduct: IProducts) : void {
     
    this.productos.push(newProduct);
    this.originalProductos.push(newProduct);

    //depuramos
    console.log('Producto añadido:', newProduct);
    console.log('Lista original actualizada:', this.originalProductos);
  
      }

      
      
}
