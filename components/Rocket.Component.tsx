import React, { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { useLoader, useFrame } from '@react-three/fiber';
import { RapierRigidBody, RigidBody, vec3 } from '@react-three/rapier';
import { Trail } from '@react-three/drei';
import { Vector2 } from 'three';

const Rocket = () => {

    const rocketModel = useLoader(GLTFLoader, "/3d/rocket/rocket.gltf")
    const rocket = useRef<RapierRigidBody>(null!)

    const calculateImpulse = 
        (rocketPosition: {x: number, y: number, z: number}, pointerPosition: Vector2) :
        {x: number, y: number, z: 0} => {

        const comparePositionsAndReturnRatio = (a: number, b: number, axis?: string): number => {
                const diff = Math.abs(a - b);
                console.log(diff, axis)
                let impulse: number;

                if(diff > 0.5){
                    impulse = 50;
                }else if(diff > 0.1){
                    impulse = 10;
                }else if(diff > 0){
                    impulse = 3;
                }else{
                    impulse = 0;
                }

                return a > b ? impulse : -impulse;
        }

        return {
            x: comparePositionsAndReturnRatio(pointerPosition.x, rocketPosition.x, "x"), 
            y: comparePositionsAndReturnRatio(pointerPosition.y, rocketPosition.y, "y"), 
            z: 0
        }
    }

    let frames: number = 0;

    useFrame((state, delta) => {
        frames ++;

        if(frames % 10 === 0)
        if(rocket.current){
            if(state.pointer.x){
                const rocketPosition = vec3(rocket.current.translation());
                rocket.current.addForce(calculateImpulse(rocketPosition, state.pointer), true);
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