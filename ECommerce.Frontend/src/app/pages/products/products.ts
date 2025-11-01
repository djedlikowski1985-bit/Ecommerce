import { Component } from '@angular/core';
import { ProductService, Product } from '../../services/ProductService';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  products: Product[];

  constructor(private productService: ProductService){
    this.products = this.productService.getProducts();
  }
}
