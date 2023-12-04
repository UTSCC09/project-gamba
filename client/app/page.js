"use client";
import Header from './components/header'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { GET_SESSION } from './queries/userQueries';
import { useEffect } from 'react';
import Link from 'next/link'
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
        <title>GambaCase</title>
        <div style={{display:"flex", flexDirection:"column"}}>
          <div style={{textAlign:"center", margin:"auto", marginTop:"15%", fontSize:"32px", maxWidth:"80%"}}>
            Welcome to GambaCase, a Counter Strike Case Simulator. To begin sign up or login by clicking the button below
          </div>
          <Link href="/signup" style={{marginLeft:"45%", marginTop:"10px", width:"100px"}}>Signup/Login</Link>
          <img style={{width:"20%", height:"20%", alignSelf:"center"}} src="https://steamcommunity-a.akamaihd.net/economy/image/-9a81dlWLwJ2UUGcVs_nsVtzdOEdtWwKGZZLQHTxDZ7I56KU0Zwwo4NUX4oFJZEHLbXU5A1PIYQNqhpOSV-fRPasw8rsUFJ5KBFZv668FFEuh_KQJTtEuI63xIXbxqOtauyClTMEsJV1jruS89T3iQKx_BBqa2j3JpjVLFH1xpp0EQ/256fx256f"></img>
        </div>
      </ApolloProvider>
    </>

  )
}