import {Column} from './column.interface'

export interface View {
    id: number,
    name: String,
    pageSize: number,
    column: Array<Column> 
}