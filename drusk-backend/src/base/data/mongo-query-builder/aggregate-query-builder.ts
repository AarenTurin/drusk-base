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
}