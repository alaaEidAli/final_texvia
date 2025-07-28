import { Pipe, PipeTransform } from '@angular/core';
import { IcontactForm } from '../IcontactForm/icontact-form';

@Pipe({
  name: 'listFilter'
})
export class ListFilterPipe implements PipeTransform {

  // transform(value: unknown, ...args: unknown[]): unknown {
  //   return null;
  // }
  transform(items: IcontactForm[], searchText: string): IcontactForm[] {
    if (!items || !searchText) {
      return items;
    }
    searchText = searchText.toLowerCase();
    return items.filter(item =>
      item.name.toLowerCase().includes(searchText) ||
      item.email.toLowerCase().includes(searchText) ||
      item.mobile.toLowerCase().includes(searchText) ||
      item.company.toLowerCase().includes(searchText) 
      // new Date(items.dat).toLocaleDateString('en-US').toLowerCase().includes(searchText)
      )

}
}