import React, { MutableRefObject, RefObject, useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { useLoader, useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { RigidBody } from '@react-three/rapier';

const Rocket = () => {

    const rocketModel = useLoader(GLTFLoader, "/3d/rocket/rocket.gltf")
    const rocket = useRef<any>(null!)

    const calculateImpulseOnAxisK = (iPointer: number, iRocket: number) => {
        const impulse = (iPointer*10 - iRocket*10)^2
        if(iPointer > iRocket){
            console.log(impulse)
            return impulse
        }else if(iPointer < iRocket){
            return -impulse
        }else{
            return 0
        }
    }

    useFrame((state, delta) => {
        if(rocket.current){
            if(state.pointer.x){
                const rocketPosition = rocket.current.translation()
                rocket.current.applyImpulse({
                    x: calculateImpulseOnAxisK(state.pointer.x, rocketPosition.x),
                    y: calculateImpulseOnAxisK(state.pointer.y, rocketPosition.y),
                    z: 0
                })
            }
        }
    })

    return (
        <RigidBody ref={rocket}>
            <mesh>
                <primitive object={rocketModel.scene} />
            </mesh>
        </RigidBody>
    )
}

export default Rocket