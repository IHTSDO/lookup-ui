import {Pipe, PipeTransform} from '@angular/core';

@Pipe({ name: 'description' })
export class DescriptionPipe implements PipeTransform {

    transform(items: any[]) {
        if (!items) {
            return [];
        }

        let response = [];

        items = items.sort(function (a, b) {
            if (a.lang === 'en') {
                return 1;
            }

            if (a.lang !== 'en') {
                return -1;
            }

            return null;
        });

        items.forEach(item => {
            for (let key in item.acceptabilityMap) {
                let value = item.acceptabilityMap[key];

                if (value === 'PREFERRED') {
                    response.unshift(item);
                    break;
                }

                if (value === 'ACCEPTABLE') {
                    response.push(item);
                    break;
                }
            }
        });

        response = response.sort(function (a, b) {
            if (a['type'] > b['type']) {
                return 1;
            }

            if (a['type'] < b['type']) {
                return -1;
            }

            return null;
        });

        response = response.filter(item => item.active);

        return response;
    }
}
