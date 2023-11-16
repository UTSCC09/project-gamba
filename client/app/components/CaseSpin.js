"use client";
import "./CaseSpin.css";
import React, { useState, useEffect, useRef } from 'react';
import CaseModel from "./CaseModel";
import { ADD_ITEM } from "../mutations/userMutations";
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

    const insertItem = () => {
        client.mutate({
            variables: {
                username: Cookies.get('username'),
                weaponName: selectedGun.weaponName,
                skinName: selectedGun.skinName,
                quality: selectedGun.quality,
                price: selectedGun.price,
                rarity: selectedGun.rarity,
                image: selectedGun.imageUrl,
                case: caseName,
            },
            mutation: ADD_ITEM,
        });
    }

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
            return (
                <div className="result_modal-background">
                    <div className="result_modal-container">
                        <div className="modal-content">
                            <div className="selected-gun">
                                <img src={selectedGun.imageUrl} className="gunDisplay"
                                    style={{ backgroundColor: getBackgroundColor(selectedGun.rarity) }}></img>
                                {selectedGun.weaponName + " | " + selectedGun.skinName || 'None'}
                                <div>{selectedGun.quality}</div>
                                <div>${(selectedGun.price).toFixed(2)}</div>
                            </div>
                            <button onClick={onClose}>Close</button>
                        </div>
                    </div>
                </div>

            );
        };

        const getBackgroundColor = (rarity) => {
            if (rarity === 'blue') return 'blue';
            else if (rarity === 'purple') return 'blueviolet';
            else if (rarity === 'pink') return 'hotpink';
            else if (rarity === 'red') return 'red';
            return 'yellow';
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

            let weaponName = "";
            let quality = "";
            let price;
            let rng1 = Math.random();
            let rng2 = Math.random();
            if (rng2 <= 0.1) {
                rng2 = 5;
                weaponName = "StatTrak™ ";
            }
            else rng2 = 0;
            if (rng1 <= 0.56) {
                quality = "Battle-Scarred";
                price = guns[itemIndex].prices[rng2];
            }
            else if (rng1 <= 0.63) {
                quality = "Well-Worn";
                price = guns[itemIndex].prices[1 + rng2];
            }
            else if (rng1 <= 0.85) {
                quality = "Field-Tested";
                price = guns[itemIndex].prices[2 + rng2];
            }
            else if (rng1 <= 0.93) {
                quality = "Minimal Wear";
                price = guns[itemIndex].prices[3 + rng2];
            }
            else {
                quality = "Factory New";
                price = guns[itemIndex].prices[4 + rng2];
            }

            const caseReward = {
                weaponName: weaponName + guns[itemIndex].weaponName,
                skinName: guns[itemIndex].skinName,
                quality: quality,
                price: price,
                rarity: guns[itemIndex].rarity,
                case: caseName,
                imageUrl: guns[itemIndex].imageUrl
            }


            if (itemIndex >= 0 && itemIndex < numItems) {
                setSelectedGun(caseReward);
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
                                        {gun.rarity === 'yellow' ?
                                            (<img src={"https://www.digiseller.ru/preview/599286/p1_2134247_b8bd3e19.png"} className="gun" style={{ backgroundColor: getBackgroundColor(gun.rarity) }}></img>)
                                            :
                                            (<img src={gun.imageUrl} className="gun" style={{ backgroundColor: getBackgroundColor(gun.rarity) }}></img>)
                                        }

                                    </div>
                                ))}
                            </div>
                            {line ? 
                            <div className="line_wrap">
                                <div ref={lineRef} className="line"></div>
                            </div> : null}
                        </div>
                        <div className="selected-gun">
                            {isResultModalOpen && <ResultModal onClose={() => { closeResultModal(), insertItem() }} />}
                        </div>
                        {!spinFinish && !isResultModalOpen ? (
                            <div className="modal_buttons">
                                <button onClick={spin}>Spin</button>
                                <button onClick={onClose}>Close</button>
                            </div>
                        ) : null}

                    </div>
                </div>
            </div>
        );
    };

    return (
        <>

            <CaseModel triggerSpin={openModal} />
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
    return guns;
}