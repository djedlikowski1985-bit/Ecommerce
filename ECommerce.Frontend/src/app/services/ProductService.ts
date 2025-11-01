import { Injectable } from '@angular/core';

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
  products: Product[] = [
    {
      id: 1,
      name: 'XFirst product',
      description: 'This is the description for the first product.',
      createdOn: new Date('2024-01-15'),
    },
    {
      id: 2,
      name: 'Second product',
      description: 'This is the description for the second product.',
      createdOn: new Date('2024-02-20'),
    },
    {
      id: 3,
      name: 'Third product',
      description: 'This is the description for the third product.',
      createdOn: new Date('2024-03-10'),
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }
}
