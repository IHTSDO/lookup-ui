import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'active'
})
export class ActivePipe implements PipeTransform {

    transform(items: any[]) {
        if (!items) {
            return [];
        }

        items = items.filter(item => item.active === true);

        return items;
    }

}
