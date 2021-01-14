import {Column} from './column.interface'
import { Sort } from './sort.interface';

export interface View {
    id: number,
    name: String,
    pageSize: number,
    column: Array<Column>,
    sort?: Array<Sort>
}