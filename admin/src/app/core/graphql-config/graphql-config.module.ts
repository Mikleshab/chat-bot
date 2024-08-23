import { NgModule } from "@angular/core";
import { ApolloClientOptions, InMemoryCache, split } from "@apollo/client/core";
import { HttpLink } from "apollo-angular/http";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";
import { Kind } from "graphql";
import { GetRepliesQuery } from "../../graphql/generated";


const uri = "http://localhost:3000/graphql";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getReplies: {
          keyArgs: (args) => {
            return args?.["input"]?.messageId?.toString();
          },
          merge(existing: GetRepliesQuery["getReplies"] = {
            edges: [],
            pageInfo: { hasNextPage: false, hasPreviousPage: false }
          }, incoming: GetRepliesQuery["getReplies"]) {
            return {
              ...incoming,
              edges: [...existing.edges, ...incoming.edges]
            };
          },
          read(existing = { edges: [], pageInfo: {} }) {
            return existing;
          }
        }
      }
    }
  }
});

export function createApollo(httpLink: HttpLink): ApolloClientOptions<unknown> {
  const http = httpLink.create({
    uri
  });

  const ws = new GraphQLWsLink(
    createClient({
      url: uri?.replace(/^(http:\/\/)|(https:\/\/)/, match => (match === "http://" ? "ws://" : "wss://"))!,
      shouldRetry: () => true
    })
  );

  const link = split(
    // Split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return definition.kind === Kind.OPERATION_DEFINITION && definition.operation === "subscription";
    },
    ws,
    http
  );

  return {
    link,
    cache
  };
}


@NgModule({
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink]
    }
  ],
  exports: [ApolloModule]
})
export class GraphqlConfigModule {
}
