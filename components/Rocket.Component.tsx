import React, { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { useLoader, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';

const Rocket = () => {

    const rocket = useLoader(GLTFLoader, "/3d/rocket/rocket.gltf")
    const ref = useRef<Mesh>(null!)

    useFrame((state, delta) => {
        if(ref.current){
            ref.current.rotation.y = -90;
            ref.current.position.z = Math.sin(state.clock.getElapsedTime() * 2) - 30;
            //ref.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 3.5) / 9;
            //ref.current.rotation.y += 0.001;

            const x = ref.current.position.x * (state.pointer.x * state.viewport.width)*2;
            const y = ref.current.position.y * (state.pointer.y * state.viewport.height)*2;
            ref.current.position.set(x, y-2, 0);
        }
    })

    return (
        <mesh ref={ref}>
            <primitive object={rocket.scene} />
        </mesh>
    )
}

export default Rocket