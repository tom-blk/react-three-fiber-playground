import React, { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { useLoader, useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import { Trail } from '@react-three/drei';

const Rocket = () => {

    const rocketModel = useLoader(GLTFLoader, "/3d/rocket/rocket.gltf")
    const rocket = useRef<any>(null!)

    const calculateImpulseOnAxisK = (iPointer: number, iRocket: number) => {
        const impulse = (iPointer - iRocket)^2
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
        <Trail 
        width={7}
        color={'#FF4F00'}
        length={1.5}
        decay={.1}
        local={false}
        stride={0}
        interval={2}
        attenuation={(width) => width}
        >
            <RigidBody ref={rocket}>
                <mesh>
                    <primitive object={rocketModel.scene} />
                </mesh>
            </RigidBody>
        </Trail>
        
    )
}

export default Rocket