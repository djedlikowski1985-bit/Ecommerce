import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../../services/ProductService';
@Pipe({
  name: 'sort',
  standalone: false,
})
export class SortPipe implements PipeTransform {
  transform(value: Product[], ...args: unknown[]): Product[] {
    if (value && value.length > 0) {
      return value.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
    }
    return [];
  }
}
