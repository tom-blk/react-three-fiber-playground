import React, { useRef } from 'react';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { useLoader, useFrame } from '@react-three/fiber';
import { RapierRigidBody, RigidBody, vec3 } from '@react-three/rapier';
import { Trail } from '@react-three/drei';
import { Mesh, Vector2 } from 'three';

const MOVEMENT_SPEED = 15;

const Rocket = () => {

    const rocketModel = useLoader(GLTFLoader, "/3d/rocket/rocket.gltf")
    const rocketBody = useRef<RapierRigidBody>(null!)
    const rocket = useRef<Mesh>(null!);


    useFrame((state, delta) => {
        const translation = rocketBody.current.translation();
        if(
            translation.x > 10 || 
            translation.x < -10 ||
            translation.y > 10 ||
            translation.y < -10
        ) {
            rocket.current.rotation.z +=.02;
        }
        const angle = rocket.current.rotation.z;

        const impulseDirection = {
            x: Math.sin(angle) * MOVEMENT_SPEED * delta,
            y: Math.cos(angle) * MOVEMENT_SPEED * delta,
            z: 0
        }

        rocketBody.current.applyImpulse(impulseDirection, true)
    })

    const leftTurn = () => {
        rocketBody.current.addTorque(vec3({x: 0,y: 0,z: 10}), true);
    }

    const rightTurn = () => {
        rocketBody.current.addTorque(vec3({x: 0,y: 0,z: -10}), true);
    }

    const accelerate = () => {
        rocketBody.current.addForce(vec3({x: 0,y: 0,z: 10}), true);
    }

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
                <RigidBody ref={rocketBody}>
                    <mesh ref={rocket}>
                        <primitive object={rocketModel.scene} />
                    </mesh>
                </RigidBody>
            </Trail>
    )
}

export default Rocket