import { Canvas, useFrame } from "@react-three/fiber"
import './CaseModel.css'
import { useRef, useState } from "react"
import { OrbitControls } from "@react-three/drei"

export default function CaseModel({triggerSpin}) {
    return (
        <div className="main" >
            <Canvas shadows>
                <Case triggerSpin={triggerSpin}/>
                <ambientLight intensity={2}/>
                <directionalLight position={[2, 1, 1]} castShadow/>
                <OrbitControls enableZoom={false} enablePan={false}/>
            </Canvas>
        </div>
    )
}

function Case({triggerSpin}){
    const [isHovered, setIsHovered] = useState(false);
  const mesh = useRef(null);

  const handlePointerOver = () => {
    setIsHovered(true);
  };

  const handlePointerOut = () => {
    setIsHovered(false);
  };

  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 0.15;
  });

    useFrame( (state, delta) =>{
        //mesh.current.rotation.x += delta * 0.25;
        mesh.current.rotation.y += delta * 0.15;
        
    })

    return(
        <mesh onClick={triggerSpin} ref={mesh} receiveShadow onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}>
            <boxGeometry args={[2, 2, 3]}/>
            <meshStandardMaterial color={isHovered? "yellow": "gold"}/>
        </mesh>   
        )
}