"use client";
import Header from './components/header'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Users from './components/Users';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        users: {
          merge(existing, incoming) {
            return incoming;
          }
        }
      }
    }
  }
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});

export default function Page() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div>
          <Users />
        </div>
      </ApolloProvider>
    </>

  )
}
