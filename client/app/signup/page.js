"use client"
import {useRef} from "react";
import "./signup.css";
import {useMutation} from '@apollo/client';
import { ADD_USER } from "../mutations/userMutations";

export default function signup() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    const [addUser] = useMutation(ADD_USER, {
        variables: {username: "a", password: "a"}
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        const username = usernameRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if(password === confirmPassword) {
            //check username is new
            addUser({variables : {username: username, password: password}});
            e.target.reset();
        }
        else console.log("passwords don't match");
        
    };

    return (
        <main>
            <h>signup</h>
            <form className="message-form" onSubmit={handleSubmit}>
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