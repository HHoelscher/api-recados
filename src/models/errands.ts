import { v4 as createUuid } from 'uuid';

export class Errand {
    private _errandId: string;
    public _archived: boolean;
    private _createdAt: Date;


constructor(
    private _title: string,
    private _detail: string,
)
{
    this._errandId =  createUuid();
    this._archived = false
    this._createdAt = new Date()
}

public get idErrand(){
    return this._errandId;
}

public get title(){
    return this._title;
}

public set title(title:string){
    this._title = title;
}

public get detail(){
    return this._detail
}

public set detail(detail:string){
    this._detail = detail;
}

public toJson(){
    return{

        id: this._errandId,
        title: this._title,
        detail: this.detail,
        archived: this._archived,
        createdAt: this._createdAt
    }
}
}

//46:23