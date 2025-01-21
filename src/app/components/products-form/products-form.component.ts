import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IProducts } from '../../interface/iproducts';
import { ProductServiceService } from '../../services/product-service.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-products-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './products-form.component.html',
  styleUrl: './products-form.component.css'
})
export class ProductsFormComponent {


//Emitimos al componente padre el metodo de alta 
  @Output() altaProductos = new EventEmitter<IProducts>();


arrProductos : IProducts[];
modelForm: FormGroup;

//Metemos en el constructor las validaciones del formulario

constructor(private ProductService : ProductServiceService){

this.modelForm = new FormGroup({
 
  name: new FormControl(null,[Validators.required,Validators.minLength(3)]),
  description : new FormControl(null,[Validators.required,Validators.minLength(10)]),
  price : new FormControl(null,[Validators.required,Validators.min(0.01)]),
  category : new FormControl(null,[Validators.required]),
  image: new FormControl(null,[Validators.required,Validators.pattern(/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/)]),
  active: new FormControl(null,[Validators.required]),
})

this.arrProductos = [];
}

//Metodo para enviar los datos de los productos nuevos, donde hemos instalado en mi proyecto de Angular
//las uuidv, para que de manera automatica asigne un id al nuevo producto agregado.
getDataForm(): void {
 
  if(this.modelForm.valid){
    const nuevoProd : IProducts = { 
      ...this.modelForm.value,
      _id : uuidv4(),
    };


    //Le emitimos el metodo al padre
    this.altaProductos.emit(nuevoProd);
    this.modelForm.reset(); // para que se quede limpio el formulario de alta tras haber agregado uno nuevo

    alert('¡Producto agregado correctamente!');
  } else {
    alert('Por favor, rellena todos los campos antes de enviar.');
  }
    
    }
  

  checkControl(FormControlName: string,validator: string): boolean | undefined {

    return this.modelForm.get(FormControlName)?.hasError(validator) && this.modelForm.get(FormControlName)?.touched
    }

}

