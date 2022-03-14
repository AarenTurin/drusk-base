import { createGraphqlGuard } from "./decorator/graphql.guard";

export const Query = createGraphqlGuard("Query");
export const Mutation = createGraphqlGuard("Mutation");
