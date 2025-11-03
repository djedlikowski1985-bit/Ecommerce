import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  createdOn: Date;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5315/products'; // Change to your actual API URL

  constructor(private http: HttpClient) {}

  getProductsAsync(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }
}
