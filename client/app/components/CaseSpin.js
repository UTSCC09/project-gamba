import "./CaseSpin.css";
import React, { useState, useEffect, useRef } from 'react';

export default function CaseSpin({ blue, purple, pink, red, knife }) {
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
            await setGuns(createGuns(blue, purple, pink, red, knife));
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

        const ResultModal = ({ onClose}) => {
            return (
                <div className="result_modal-background">
                    <div className="result_modal-container">
                        <div className="modal-content">
                            <div className="selected-gun">
                                Selected Gun: {selectedGun || 'None'}
                            </div>
                            <button onClick={onClose}>Close</button>
                        </div>
                    </div>
                </div>
                
            );
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
                console.log(guns);
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
                                        <div className="gun">{gun} </div>
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

            <button onClick={openModal}>Open Modal</button>

            {isModalOpen && <Modal onClose={closeModal} />}
        </>
    )
}

function createGuns(blue, purple, pink, red, knife) {
    let rng1, rng2;
    const blueSize = blue.length;
    const knifeSize = knife.length;
    let guns = [];

    for (let i = 0; i < 100; i++) {
        rng1 = Math.random();
        if (rng1 <= 0.8) {
            rng2 = Math.floor(Math.random() * blueSize);
            guns.push(blue[rng2]);
        }
        else if (rng1 <= 0.96) {
            rng2 = Math.floor(Math.random() * 4);
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
            guns.push(knife[rng2]);
        }
    }
    return guns;
}