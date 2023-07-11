import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'group'
})
export class GroupPipe implements PipeTransform {

    transform(items: any[]) {
        if (!items) {
            return [];
        }

        items = items.filter(item => item.groupId !== 0);

        items = items.sort(function (a, b) {
            if (a['groupId'] > b['groupId']) {
                return 1;
            }

            if (a['groupId'] < b['groupId']) {
                return -1;
            }

            return null;
        });

        return items;
    }

}
