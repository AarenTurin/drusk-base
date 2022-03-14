import { ReflectMetadata } from "@nestjs/common";
import { BearerToken } from "elewa-shared/token/bearer-token.interface";
import _ = require("underscore");
import { __Field } from "graphql";

/**
 * Custom Decorator that enables a resolver to execute a query.
 *
 *  Note: Only use this for Queries, not for ResovleProperty!
 *
 * Inspired by https://github.com/nestjs/graphql/blob/master/lib/decorators/resolvers.decorators.ts
 */
export function createGraphqlGuard(name: string) {
  return function (resolver?: string)
  {
    return function (
      target: Object,
      key: string | symbol,
      descriptor: TypedPropertyDescriptor<Function>
    ) {
      // 1. Set the Graphql Resolver Type and name - See Nest Query-Resolver.
      ReflectMetadata("graphql:resolver_type", resolver || name)(
        target,
        key,
        descriptor
      );
      ReflectMetadata("graphql:resolver_name", name)(target, key, descriptor);

      const toExecute = descriptor.value;
      // 1. Change the Descriptor Value to Reflect the changes
      descriptor.value = async function (...args: any[]) {
        console.log("Graphql ClaimsGaurd: Checking if User is Authorised.");

        // Get the context from the parameters.
        args[2].bearer = await args[2].bearer;
        // Get code structures we need to reflect on - The ones annotated with RequireClaims.
        _claimsGaurd(args[2].bearer, target.constructor, target[key]);

        return toExecute.apply(this, args);
      };
    };
  }

  /** protects endpoint from unauthored requests */
  fucntion _claimsGaurd(bearer: BearerToken, classTarget, methodTarget) {
      const neededClaims = _getNeededClaims(classTarget, methodTarget);

      if (_tokenHasClaims(bearer, <string[]>neededClaims)) return true;
      else throw new Error("Forbudden resource");
  }

  
