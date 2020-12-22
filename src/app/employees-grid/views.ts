import { View } from '../interfaces/view.interface';
import { products } from './produts';
import {Column} from '../interfaces/column.interface'


let append = () =>{
    let all: Array<Column> = []
    Object.keys(products[0]).forEach(x => all.push({field: x}))
    return all
} 

export const views: View[] = [
    {
        id: -1,
        name: 'all',
        column: append()
    },
    {
        id: 0,
        name: 'only2',
        column: [{field: "ProductName"}, {field: "ProductID"}] 
    },
]

