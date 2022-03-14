import { ReflectMetadata } from "@nestjs/common";
import { BeaerToken } from "elewa-shared/token/bearer-token.interface";
import _ = require("underscore");
import { _Field } from "graphlq";

/**
 * Custom Decorator that enables a resolver to execue a query
 * Note: Only use this for queries, not for resolveProperty
 * Inspired by  https://github.com/nestjs/graphql/blob/master/lib/decorators/resolvers.decorators.ts
 */

export function createGraphGuard(name: string) {
    return function (resolver?: string)
    {
        return function (
            target: Object,
            key: string | symbol,
            descriptor: TypedPropertyDescriptor<Function>
        ){
            // set the Graph1 resolver type and name - see nest query-resolver
            ReflectMetaData("graphql:resolver_type", resolver || name)(
                target,
                key,
                descriptor
            );
            ReflectMetadata("graphql:resolver_type", resolver || name)(
                target,
                key,
                descriptor
            );
            ReflectMetadata("graphql:esolver_name", name)(target, key, descriptor);

            const toExecute = descriptor.value;
            // Change the descriptor value to reflect the changes
            descriptor.value = async function (...args: any[]) {
                console.log("Graphql ClaimsGaurd: Checking if User is Authorised.");

            //Get the ontext from the parameters
            }
        }
    }
}