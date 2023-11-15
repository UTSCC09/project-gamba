"use client";
import Header from '../components/header'
import CaseSpin from '../components/CaseSpin'
import { useState, useEffect } from 'react';
import Cookies from "js-cookie";
import './home.css'

export default function Home() {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(null);
    const [Case, setCase] = useState("chroma");
    const cases = ["chroma", "chroma2", "chroma3", "falchion", "gamma", "gamma2"];

    // Listen for changes in the 'username' cookie
    useEffect(() => {
        const username = Cookies.get('username');
        setIsUserLoggedIn(username);
    }, []);

    function handleLeft(){
        let index= cases.indexOf(Case);
        if (index == 0){
            setCase(cases[cases.length-1]);
        }else{
            setCase(cases[cases.indexOf(Case)-1]);
        }   
    }

    function handleRight(){
        console.log(Case);
        let index= cases.indexOf(Case);
        if (index == cases.length-1){
            setCase(cases[0]);
        }else{
            setCase(cases[cases.indexOf(Case)+1]);
        }
    }

    return (
        <>
            {isUserLoggedIn ? (
                <div className='home'>
                    <Header />
                    <CaseSpin caseName={Case} />
                    <div className='case_text'>
                        <div className='home_wrapper'>
                            <div className="home_container">
                                <button onClick={handleLeft}>left</button>
                                <h3>Selected: {Case}</h3>
                                <button onClick={handleRight}>right</button>
                            </div>
                            <div className="home_container">
                                <h3>Click the case to start opening</h3>
                            </div>
                        </div>
                    </div>
                </div>
            ) : <div>You are not authenticated. Please log in.</div>}
        </>
    )
}