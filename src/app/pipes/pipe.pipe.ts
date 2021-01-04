import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipe'
})
export class PipePipe implements PipeTransform {

  transform(items, filter): any {
    // console.log('filter', filter)
    if (!items || !filter) {
      return items;
  }
  // filter items array, items which match and return true will be
  // kept, false will be filtered out
  return items.filter(item => {
    // console.log('item.tit', item.title)
    return item.title.toLowerCase().indexOf(filter.toLowerCase()) != -1 || item.author.toLowerCase().indexOf(filter.toLowerCase()) != -1;
  })
  }

}
