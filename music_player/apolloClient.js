import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { ApolloLink } from 'apollo-link'
import { InMemoryCache } from 'apollo-cache-inmemory';


const httpLink = new HttpLink({ uri: 'https://api-staging.ragya.com/graphql' })
const middlewareAuthLink = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      Authorization: "",
    }
  })

  return forward(operation)
})

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink)

let counter = 0

export const client = new ApolloClient({          //Network interface for graphql queries
  link: httpLinkWithAuthToken,
  cache: new InMemoryCache({
    dataIdFromObject: object => {
      return `${object.__typename}:${object.id || counter++}`
    }
  })
})