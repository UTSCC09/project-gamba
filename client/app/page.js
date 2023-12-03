"use client";
import Header from './components/header'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_SESSION } from './queries/userQueries';
import { useEffect } from 'react';
import "./components/Body.css";

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
  uri: process.env.NEXT_PUBLIC_BACKEND,
  cache: new InMemoryCache(),
  credentials: 'include',
});

export function getUsername() {
  return document.cookie.replace(
      /(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/,
      "$1",
  );
}

export default function Page() {

  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <div>
          Landing page
        </div>
      </ApolloProvider>
    </>

  )
}