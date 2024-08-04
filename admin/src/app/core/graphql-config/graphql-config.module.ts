import { NgModule } from "@angular/core";
import { ApolloLink, InMemoryCache } from "@apollo/client/core";
import { HttpLink } from "apollo-angular/http";
import { APOLLO_OPTIONS, ApolloModule } from "apollo-angular";


const uri = "http://localhost:3000/graphql"; // Замените на URL вашего GraphQL сервера

export function createApollo(httpLink: HttpLink) {
  return {
    link: ApolloLink.from([httpLink.create({ uri })]),
    cache: new InMemoryCache()
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
