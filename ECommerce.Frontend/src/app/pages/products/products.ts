import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from '../../services/ProductService';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: Product[] = [];
  loading: boolean = true;

  constructor(private productService: ProductService){
    
  }

  ngOnInit() {
    this.loading = true; 
    this.productService.getProductsAsync().subscribe({
      next: (products) => {
        this.products = products;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.loading = false;
      }
    });
  }
}
