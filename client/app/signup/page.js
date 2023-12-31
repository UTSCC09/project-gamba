"use client"
import { useRef, useState } from "react";
import "./signup.css";
import { ADD_USER, LOGIN } from "../mutations/userMutations";
import { GET_USER } from "../queries/userQueries";
import { client } from "../page"
import { useRouter } from 'next/navigation'
import "../components/Body.css";
import Cookies from 'js-cookie';

export default function Signup() {
  const router = useRouter()
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [error, setError] = useState(null);

  const handleSignup = async (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    const { data } = await client.query({
      variables: { username: username },
      query: GET_USER,
    });

    if (!data.user) {
      if (password == confirmPassword) {
        try {
          const { data } = await client.mutate({
            variables: { username: username, password: password },
            mutation: ADD_USER,
          });
          console.log('User added:', data.addUser);
          usernameRef.current.value = "";
          passwordRef.current.value = "";
          confirmPasswordRef.current.value = "";
          setError(null);
          Cookies.set("username", username, { expires: 1 });
          setError(null); // Clear any previous error
          router.push("/home")
        } catch (error) {
          setError('Error adding user. Please try again.');
        }
      } else {
        setError('Passwords do not match');
      }
    } else {
      setError('User already exists');
    }
  };

  const handleSignIn = async (event) => {
    event.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    const { data } = await client.mutate({
      variables: { username: username, password: password },
      mutation: LOGIN,
    });

    if (data.login.username === null) {
      setError('Incorrect Username or Password');
    } else {
      Cookies.set("username", username, { expires: 1 });
      setError(null); // Clear any previous error
      router.push("/home")
    }

  };

  const [isSignUp, setIsSignUp] = useState(true);

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError(null); // Clear any previous error when switching forms
  };

  return (
    <main>
      <title>GambaCase Login/Signup</title>
      {isSignUp ? (
        <form className="message-form" onSubmit={handleSignup}>
          <div className="form-title">New User Sign Up</div>
          <input
            type="text"
            className="form-element"
            placeholder="Enter Username"
            name="username"
            required
            ref={usernameRef}
          />
          <input
            type="text"
            className="form-element"
            placeholder="Enter Password"
            name="password"
            required
            ref={passwordRef}
          />
          <input
            type="text"
            className="form-element"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            ref={confirmPasswordRef}
          />
          <button type="submit" className="btn">
            Sign Up
          </button>
          <p className="error-message">{error}</p>
          Already have an account?
          <button type="button" className="btn" onClick={toggleForm}>
            Sign In
          </button>
        </form>
      ) : (
        <form className="message-form" onSubmit={handleSignIn}>
          <div className="form-title">Sign In</div>
          <input
            type="text"
            className="form-element"
            placeholder="Enter Username"
            name="username"
            required
            ref={usernameRef}
          />
          <input
            type="text"
            className="form-element"
            placeholder="Enter Password"
            name="password"
            required
            ref={passwordRef}
          />
          <button type="submit" className="btn">
            Sign In
          </button>
          <p className="error-message">{error}</p>
          Don't have an account?
          <button type="button" className="btn" onClick={toggleForm}>
            Sign Up
          </button>
        </form>
      )}
    </main>
  );
}