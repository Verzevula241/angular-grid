import { BehaviorSubject } from "rxjs";
import { views } from "../data/views";
import { Column } from "../interfaces/column.interface";
import { Sort } from "../interfaces/sort.interface";
import { View } from "../interfaces/view.interface";

const CREATE_ACTION = 'create';
const UPDATE_ACTION = 'update';
const REMOVE_ACTION = 'destroy';

export class EditService extends BehaviorSubject<any[]>{
    constructor() {
        super([]);
    }

    private data: View[] = [];

    public read() {
        if (this.data.length) {
            return this.data;
        }
        let data = this.getLocalViews(views)
        return this.data = data
    }

    public save(view: any, isNew?: boolean) {
        const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

        switch(action){
            case(UPDATE_ACTION):
            const updatedItems = this.data.map(el => el.id === view.id ? view : el)
            this.data = updatedItems
            localStorage.setItem('views',JSON.stringify(this.data))
        }
    }

    public getLocalViews(views: View[]): View[] {
            const session = localStorage.getItem('views')
            if(!session){
              const gridViews = views
              localStorage.setItem('views',JSON.stringify(gridViews))
              return gridViews 
            }
            else return JSON.parse(session)
      }

    public remove(data: any){
        let updatedItems: View[] = []
        this.data.map((el,index) => el.id === data.id ? this.data.splice(index,1) : el)
        updatedItems = this.data
        updatedItems.length === 0 ? localStorage.removeItem('views'):localStorage.setItem('views',JSON.stringify(updatedItems))
        
    }
    public removeSort(data: any,sort:Sort){
        let updatedItems: View[] = []
        this.data.map((el,index) => el.id === data.id ? el.sort = data.sort : el)
        updatedItems = this.data
        updatedItems.length === 0 ? localStorage.removeItem('views'):localStorage.setItem('views',JSON.stringify(updatedItems))
        
    }

    public replaceOrder(data: Array<Column>): Array<Column>{

         data.forEach((item,index,array)=> {
            if(item.order !== undefined){
               return  array =  this.array_move(array,index,item.order)
            }
            return array
            
        });

        return data

    }
    public upOrder(arr: Array<Column>, old_index:number,){
        if (old_index >= arr.length) {
            return arr
         }
         arr.splice(old_index-1, 0, arr.splice(old_index, 1)[0]);
         arr[old_index-1].order = old_index-1
         arr[old_index].order = old_index
         return arr;
    }
    public downOrder(arr: Array<Column>, old_index:number,){
        if (old_index >= arr.length) {
            return arr
         }
         arr.splice(old_index+1, 0, arr.splice(old_index, 1)[0]);
         arr[old_index+1].order = old_index+1
         arr[old_index].order = old_index
         return arr;
    }

    private array_move(arr: Array<Column>, old_index:number, new_index:number) {
        if (new_index >= arr.length) {
           return arr
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr;
    };

    // private reset() {
    //     this.data = [];
    // }

    
    // private serializeModels(data?: any): string {
    //     return data ? `&models=${JSON.stringify([data])}` : '';
    // }
}