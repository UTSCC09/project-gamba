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

export const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
  credentials: 'include',
});

export default function Page() {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div>
          hi
        </div>
      </ApolloProvider>
    </>

  )
}