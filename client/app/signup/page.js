"use client"
import {useRef} from "react";
import "./signup.css";
import {useMutation} from '@apollo/client';
import { ADD_USER } from "../mutations/userMutations";
import {client} from "../page"

export default function signup() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const handleSignup = async (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    console.log(username)
    console.log(password)
    console.log(confirmPassword)
    // Check if password and confirmPassword match, and perform any other validation needed
  
    try {
      const { data } = await client.mutate({
        variables: { username: username, password: password },
        mutation: ADD_USER,
      });
  
      // Handle the response data if needed
      console.log('User added:', data.addUser);
  
      // Clear the input fields or perform any other necessary actions after signup
      usernameRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    } catch (error) {
      console.error('Mutation error:', error);
      // Handle the error, show a message, or take appropriate actions
    }
  };

    return (
        <main>
            <h>signup</h>
            <form className="message-form" onSubmit={handleSignup}>
                <div className="form-title">New User Sign Up</div>
                <input
                    type = "text"
                    className = "form-element"
                    placeholder = "Enter Username"
                    name = "username"
                    required
                    ref = {usernameRef}
                />
                <input
                    type = "text"
                    className = "form-element"
                    placeholder = "Enter Password"
                    name = "password"
                    required
                    ref = {passwordRef}
                />
                <input
                    type = "text"
                    className = "form-element"
                    placeholder = "Confirm Password"
                    name = "confirmPassword"
                    required
                    ref = {confirmPasswordRef}
                />
                <button type="submit" className="btn">Sign Up</button>
            </form>
        </main>
    )
}