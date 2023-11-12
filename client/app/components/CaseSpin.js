"use client";
import "./CaseSpin.css";
import React, { useState, useEffect, useRef } from 'react';
import CaseModel from "./CaseModel";
import { ADD_ITEM } from "../mutations/userMutations";
import { useMutation } from '@apollo/client'
import Cookies from "js-cookie";
import { client } from "../page"


export default function CaseSpin({ caseName }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isResultModalOpen, setIsResultModalOpen] = useState(false);
    let [selectedGun, setSelectedGun] = useState(null);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openResultModal = () => {
        setIsResultModalOpen(true);
    };

    const closeResultModal = () => {
        setIsResultModalOpen(false);
    };

    const Modal = ({ onClose }) => {
        let [guns, setGuns] = useState([]);
        let [spinFinish, setSpin] = useState(false);
        let [scrollPosition, setScrollPosition] = useState(0);
        let [startSpin, setStartSpin] = useState(true);
        let [line, setLine] = useState(false); // lineRef.current = lineRef.current || lineRef.current.getBoundingClientRect().left - container.getBoundingClientRect().left;
        const lineRef = useRef();

        async function spin() {
            setLine(true);
            setStartSpin(false);
            await setGuns(createGuns(caseName));

            setSpin(true);
            setStartSpin(true);
            const container = document.querySelector('.guns');
            const items = container.getElementsByClassName('gun');
            const itemWidth = items.length > 0 ? items[0].offsetWidth : 0;
            const containerWidth = container.offsetWidth;

            if (itemWidth === 0 || containerWidth === 0) {
                return;
            }

            const numItems = items.length;
            const totalWidth = itemWidth * numItems + Math.random() * 5000;
            const scrollSpeed = 9500 + Math.random() * 5000; // Adjust the scroll speed as needed



            const scroll = () => {
                setScrollPosition(prevPosition => (scrollSpeed) % totalWidth);
            };

            const animation = setInterval(scroll, 50)

            setTimeout(() => {
                clearInterval(animation);
                setSpin(false);
            }, 6250);
            return () => {
                clearInterval(animation);
            };
        };

        const ResultModal = ({ onClose }) => {
            console.log(selectedGun.weaponName, selectedGun.skinName, selectedGun.quality, selectedGun.price)

            client.mutate({
                variables: {
                    username: Cookies.get('username'),
                    weaponName: selectedGun.weaponName,
                    skinName: selectedGun.skinName,
                    quality: "Factory New",
                    price: 0,
                },
                mutation: ADD_ITEM,
            });


            return (
                <div className="result_modal-background">
                    <div className="result_modal-container">
                        <div className="modal-content">
                            <div className="selected-gun">
                                <img src={selectedGun.imageUrl} className="gun"
                                    style={{ backgroundColor: getBackgroundColor(selectedGun.skinName) }}></img>
                                Selected Gun: {selectedGun.weaponName + " | " + selectedGun.skinName || 'None'}
                            </div>
                            <button onClick={onClose}>Close</button>
                        </div>
                    </div>
                </div>

            );
        };

        const getBackgroundColor = (skinName) => {
            if (skinName === 'Grotto') {
                return 'lightblue';
            } else if (skinName === 'ExampleSkinName2') {
                return 'lightgreen';
            }
            return 'lightgray';
        };

        useEffect(() => {
            if (!spinFinish) {
                if (isModalOpen) {
                    handleLinePosition();
                }

            }
        }, [spinFinish]);

        const handleLinePosition = () => {

            const line = lineRef.current;

            const container = document.querySelector('.guns');
            const items = container.getElementsByClassName('gun');
            const itemWidth = items.length > 0 ? items[0].offsetWidth : 0;

            if (itemWidth === 0) {
                return;
            }

            const linePosition = line.getBoundingClientRect().left - container.getBoundingClientRect().left;
            const numItems = items.length;
            const itemIndex = Math.floor(linePosition / itemWidth);


            if (itemIndex >= 0 && itemIndex < numItems) {
                setSelectedGun(guns[itemIndex]);
            }
            openResultModal();
        };

        return (
            <div className="modal-background">
                <div className="modal-container">
                    <div className="modal-content">
                        <div className="gun-container">
                            <div className="guns" style={
                                !startSpin ? { left: `-${scrollPosition}px` } :
                                    { transform: `translateX(-${scrollPosition}px)`, transition: 'transform 5s' }
                            }>
                                {guns.map((gun, index) => (
                                    <div key={index}>
                                        <img src={gun.imageUrl} className="gun"
                                            style={{ backgroundColor: getBackgroundColor(gun.skinName) }}></img>
                                    </div>
                                ))}
                            </div>
                            {line ? <div ref={lineRef} className="line"></div> : null}
                        </div>
                        <div className="selected-gun">
                            {isResultModalOpen && <ResultModal onClose={closeResultModal} />}
                        </div>
                        <div className="modal_buttons">
                            <button onClick={spin}>Spin</button>
                            <button onClick={onClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>

            <CaseModel triggerSpin={openModal} />
            <div className="home_container">
                <h3>Click the case to start opening</h3>
            </div>
            {isModalOpen && <Modal onClose={closeModal} />}

        </>
    )
}

function createGuns(caseName) {
    let knives;
    let weaponCase = require(`../../cases/${caseName}`);
    let blue = weaponCase.blue;
    let purple = weaponCase.purple;
    let pink = weaponCase.pink;
    let red = weaponCase.red;

    if (caseName.includes("chroma")) {
        knives = require("../../cases/chromaKnives");
        knives = knives.knife;
    }
    else if (caseName.includes("gamma")) {
        knives = require("../../cases/gammaKnives");
        knives = knives.knife;
    }
    else
        knives = weaponCase.knife;

    let rng1, rng2;
    const blueSize = blue.length;
    const purpleSize = purple.length;
    const knifeSize = knives.length;
    console.log(knives);
    console.log(blueSize, purpleSize, knifeSize);
    let guns = [];



    for (let i = 0; i < 100; i++) {
        rng1 = Math.random();
        if (rng1 <= 0.8) {
            rng2 = Math.floor(Math.random() * blueSize);
            guns.push(blue[rng2]);
        }
        else if (rng1 <= 0.96) {
            rng2 = Math.floor(Math.random() * purpleSize);
            guns.push(purple[rng2]);
        }
        else if (rng1 <= 0.99) {
            rng2 = Math.floor(Math.random() * 3);
            guns.push(pink[rng2]);
        }
        else if (rng1 <= 0.996) {
            rng2 = Math.floor(Math.random() * 2);
            guns.push(red[rng2]);
        }
        else {
            rng2 = Math.floor(Math.random() * knifeSize);
            guns.push(knives[rng2]);
        }
    }
    console.log(guns);
    return guns;
}