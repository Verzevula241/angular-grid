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
        const gridViews = session === null ? views : JSON.parse(session)
        return gridViews
      }

    
    private reset() {
        this.data = [];
    }

    
    private serializeModels(data?: any): string {
        return data ? `&models=${JSON.stringify([data])}` : '';
    }
}