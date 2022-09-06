import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'ungroup'
})
export class UngroupPipe implements PipeTransform {

    transform(items: any[]) {
        if (!items) {
            return [];
        }

        items = items.filter(item => item.groupId === 0);
        items = items.filter(item => item.type.id !== '116680003');

        items = items.sort(function (a, b) {
            if (a['groupId'] > b['groupId']) {
                return 1;
            }

            if (a['groupId'] < b['groupId']) {
                return -1;
            }
        });

        return items;
    }

}
