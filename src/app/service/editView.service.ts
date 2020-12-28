import { BehaviorSubject } from "rxjs";
import { views } from "../data/views";
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

    public save(data: any, isNew?: boolean) {
        const action = isNew ? CREATE_ACTION : UPDATE_ACTION;

        switch(action){
            case(UPDATE_ACTION):
            const updatedItems = this.data.map(el => el.id === data.id ? data : el)
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
    private reset() {
        this.data = [];
    }

    
    private serializeModels(data?: any): string {
        return data ? `&models=${JSON.stringify([data])}` : '';
    }
}