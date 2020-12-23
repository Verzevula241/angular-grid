import { Column } from '../interfaces/column.interface';
import { products } from './produts';


 let columns = () =>{
    let all: Array<Column> = []
    Object.keys(products[0]).forEach(x => all.push({field: x, title: x}))
    return all
} 
let productColumns = columns()

export {productColumns}