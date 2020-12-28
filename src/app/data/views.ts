import { View } from '../interfaces/view.interface';
import { products } from './produts';
import { Column } from '../interfaces/column.interface'


let append = () => {
    let all: Array<Column> = []
    Object.keys(products[0]).forEach((x,index) =>
        all.push(
            {
                field: x,
                title: x,
                locked: false,
                hidden: false,
                order: index

            }))
    return all
}

export const views: View[] = [
    {
        id: -1,
        name: 'all',
        pageSize: 10,
        column: append()
    }
]

