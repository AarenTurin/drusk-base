import { ObjectID } from 'bson';

import { ProjectionField } from './projection-field.interface';
import { FilterField } from './filter-field.interface';


// Query builder for aggregate queries

// fluent API use new ..().method().method().build()

export class AggregateQueryBuilder {
    private _predicate: Object[];

    constructor() {
        this._predicate = [];
    }

 /**
  * Deconstructs an array field from the input documents to output a document for each element.
  *
  * @param <string> toUnwind - Field Path.
  * @param <object> toUnwind - { path: <field path>, includeArrayIndex: <string>, preserveNullAndEmptyArrays: <boolean> }
  * @see https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/
  */
 public unwindChildren(childName: string | object){
     this._predicate.push({ $unwind: "$" + childName });
     // example output { $unwind: "$streams" }

     return this;
 }
 /**
  * Recursively deconstructs an array path from the input documents to output a document for each element.
  *
  * @param <string> childNames - Field Path. FirstElToUnwind.ChildEl.ChildEl.(...)
  */
 public unwindChildrenRecursive(...childNames: (string | object)[])
 {
     for (var i = 0; i < childNames.length; i++)
     {
        //  the first elment always contains the $
        let toUnwind = childNames[0];

        // for each step at the iteration, unwinf one further child
        for (var j =1; j <= i; j++)
        toUnwind += "." + childNames[j];

        // do the unwinding of the current level
        this.unwindChildren(toUnwind);
     }
     return this;
 }
/**
  * Outputs the document with a child matching the presented ID
  *
  * @param childPath - Field Path. @see https://docs.mongodb.com/manual/reference/operator/aggregation/unwind/
  * @param childId - Object ID of child
  */
 public findSingleChild(childPath: string | object, childId: ObjectID) {
    this.unwindChildren(childPath);

    const predPart = {};
    predPart[childPath + "_id"] = childId;
    this._predicate.push({ $match: predPart });
    // example output { $unwind: "$streams" }, {  $match: { "streams._id": streamObjectId } },

    return this;
  }

  /**
  * Performs a left outer join to a collection in the same database.
  *
  * Adds a new array field whose elements are the matching documents from the “joined” collection
  *
  * @param from -	Root collection name from where the join is being done.
  * @param localField - Foreign Key (FK).
  * @param to - Collection to which the join is being done.
  * @param toField - Field on the foreign collection with which the FK binds.
  * @param as - Specifies the name of the new array field to add to the input documents. The new array field contains the matching documents from the from collection.
  */
 public join(from: string, fromField: string, to: string, toField: string, as: string) {
     this._predicate.push({
         $lookup: {
             from: to, // MongoDB does it opposite to SQL
             localField: fromField,
             foreignField: toField,
             as
         }
     });
     
     return this;
 }
 // Uses https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/ - But be aware

  /**
  *
  * @param childName -	Child in collection from where the join is being done.
  * @param localField - Foreign Key on child (FK).
  * @param to - Collection to which the join is being done.
  * @param toField - Field on the foreign collection with which the FK binds.
  * @param as - Specifies the name of the new array field to add to the input documents. The new array field contains the matching documents from the from collection.
  */

}