import { Canvas, useFrame } from "@react-three/fiber"
import './CaseModel.css'
import { useRef, useState } from "react"
import { OrbitControls } from "@react-three/drei"

export default function CaseModel({ triggerSpin }) {
    return (
        <div className="main" >
            <Canvas shadows>
                <Case triggerSpin={triggerSpin} />
                <Floor />
                <ambientLight intensity={2} />
                <directionalLight position={[-2, 2, 1]} castShadow />
                <OrbitControls enableZoom={false} enablePan={false} />
            </Canvas>
            {/* <div className="case_text">
                <div className="home_container">
                    <h3> Change Cases</h3>
                </div>
                <div className="home_container">
                    <h3>Click the case to start opening</h3>
                </div>
            </div> */}

        </div>

    )
}
function Floor() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]} receiveShadow>
            <planeGeometry args={[20, 20]} />
            <shadowMaterial transparent opacity={0.3} />
        </mesh>
    );
}

function Case({ triggerSpin }) {
    const [isHovered, setIsHovered] = useState(false);
    const mesh = useRef(null);

    const handlePointerOver = () => {
        setIsHovered(true);
    };

    const handlePointerOut = () => {
        setIsHovered(false);
    };



    useFrame((state, delta) => {
        //mesh.current.rotation.x += delta * 0.25;
        mesh.current.rotation.y += delta * 0.3;
    })

    return (
        <mesh onClick={triggerSpin} ref={mesh} castShadow receiveShadow onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut} position={[0, -1.4, 0]}>
            <boxGeometry args={[2, 2, 3]} />
            <meshStandardMaterial color={isHovered ? "yellow" : "gold"} />
        </mesh>
    )
}