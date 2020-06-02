import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subcategory'
})
export class SubcategoryPipe implements PipeTransform {

  transform(categories: Array<any>, filter: String): String[] {
    let c = categories.filter(i => i.category === filter)[0]
    return c.subCategories;
  }

}
