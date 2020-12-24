export interface Column{
    field: string,
    title: string,
    locked?: boolean,
    hidden?: boolean,
    width?: number,
    order?: number
}