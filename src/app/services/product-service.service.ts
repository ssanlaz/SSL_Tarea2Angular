import { Injectable } from '@angular/core';
import { IProducts } from '../interface/iproducts';


@Injectable({
  providedIn: 'root'
})

export class ProductServiceService {
 
private apiUrl: string = 'https://jsonblob.com/api/1328850478603362304'; // Llamada a la API de productos externa 
 private Arrproductos : IProducts[]; //Array de productos creado para introducir los de la API
 

  constructor() {

    this.Arrproductos = [];

  }
      

   //metodo de llamada para sacar los productos y guardarlos en el array
   getAllProductos(): Promise<IProducts[]>{
    return fetch(this.apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al obtener los productos');
        }
        return response.json(); // Convertimos la respuesta a JSON
      })
      .then((productos) => {
        console.log('Productos cargados desde la API:', productos);
        this.Arrproductos = productos; // Guardamos los productos en el array
        return this.Arrproductos; // Devolvemos los productos
      })
      .catch((error) => {
        console.error('Error en la petición:', error);
        return []; // En caso de error, devolvemos un array vacío
      });


}
}