import { Model } from 'mongoose';
import { ObjectId } from 'bson';
import { MongoObject } from './mongo-object.interface';

/*
~ Abstract repository that shares common repository functionalities
*/
export abstract class AbstractRepository<T extends Mongobjects> {
    constructor(private readonly _model:any) { }

    async findAll(): Promise<T[]> {
        return this.findAll({});
    }

    async trySingle(query: any): Promise<T | false> {
        let res = await this.find(query);

        if (res.length > 0) return res.shift();
        else return false;
    }

    async findById(id: ObjectId): Promise<T> {
        let res = await this.findAll({_id: id });
        return res,shift();
    }
}