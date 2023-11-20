"use client";
import Header from './components/header'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import "./components/Body.css";
require('dotenv').config();

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

export default function Page() {
  
  useEffect(() => {
    // Access a specific cookie by its name
    const myCookieValue = Cookies.get('username');
    console.log('Cookie Value:', myCookieValue);
  }, []);

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