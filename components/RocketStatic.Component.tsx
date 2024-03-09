'use client';
import React, {MutableRefObject, Suspense, useEffect, useRef} from 'react';
import { Canvas, RootState, useFrame, useLoader } from '@react-three/fiber';
import { Mesh,  } from 'three';
import * as THREE from 'three';
import { Trail } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { OrbitControls } from '@react-three/drei';
import { degToRad } from 'three/src/math/MathUtils.js';
import { Physics, RapierRigidBody, RigidBody } from '@react-three/rapier';

const MOVEMENT_SPEED = 0.1;

const Scene = ({controls}: {controls: "autoPilot" | "mouse"}) => {
    //Double line breaks because the code is long and complex. 

    const rocketModel = useLoader(GLTFLoader, "/3d/rocket/rocket.gltf")
    const rocketMeshRef = useRef<Mesh>(null!);
    const rocketBodyRef = useRef<RapierRigidBody>(null!)
    const targetRef = useRef<Mesh>(null!);


    const rotationSpeed = 1;
    const spherical = new THREE.Spherical();
    const rotationMatrix = new THREE.Matrix4();
    const targetQuaternion = new THREE.Quaternion();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


    const rocketIsUnderMaxVel = (rocket: MutableRefObject<RapierRigidBody>, max: number) => {
        if(rocketBodyRef.current)
        return rocket.current.linvel().x < max && rocket.current.linvel().y < max && rocket.current.linvel().z < max;
    }


    useEffect(() => {
    //Run the updating functions once to start a recursive loop
        generateTarget();
    }, [])


    useFrame((state, delta) => {
    // Generate impulse from the back of the rocket based on the direction it's facing 

        const rocketForwardDirection = new THREE.Vector3(0, 0, -1);
        rocketMeshRef.current.getWorldDirection(rocketForwardDirection);

        const impulseDirection = {
            x: -rocketForwardDirection.x * MOVEMENT_SPEED * delta,
            y: -rocketForwardDirection.y * MOVEMENT_SPEED * delta,
            z: -rocketForwardDirection.z * MOVEMENT_SPEED * delta
        };

        if(rocketBodyRef.current && rocketMeshRef.current){
            animate(delta, impulseDirection);
            updateRotationMatrix(state);
        }
    });


    const animate = (delta: number, impulseDirection: {x: number, y: number, z: number}) => {
    // If the rocket is not at the target rotation, rotate it towards the target
        if(!rocketMeshRef.current.quaternion.equals(targetQuaternion)) {
            const step = delta * rotationSpeed
            rocketMeshRef.current.quaternion.rotateTowards(targetQuaternion, step);
            rocketBodyRef.current.setAngularDamping(MOVEMENT_SPEED * 15);
            rocketBodyRef.current.setLinearDamping(MOVEMENT_SPEED * 15);
        }

    // Stop the rocket from accelerating if it's at max velocity
        if(rocketIsUnderMaxVel(rocketBodyRef, 10))
            rocketBodyRef.current.applyImpulse(impulseDirection, true);
    
    // Brake the rocket when it is near the target 
        const rocketBodyRefVector = rocketBodyRef.current.translation();
        if(new THREE.Vector3(rocketBodyRefVector.x, rocketBodyRefVector.y, rocketBodyRefVector.z).distanceTo(targetRef.current.position) < 0.5) {
            rocketBodyRef.current.setLinearDamping(MOVEMENT_SPEED * 50);
            rocketBodyRef.current.setAngularDamping(MOVEMENT_SPEED * 50);
        }
    }


    const generateTarget = () => {
    // Generate the target
        spherical.theta = Math.random() * Math.PI * 2;
        spherical.phi = Math.acos( ( 2 * Math.random() ) - 1 );
        spherical.radius = 2;

        targetRef.current.position.setFromSpherical( spherical );

        setTimeout( generateTarget, 2000 );
    }


    const updateRotationMatrix = (state: RootState) => {
    // The mesh itself doesn't move, but the body does, so we need to create a vector from the body's position
        const rocketBodyRefVector = rocketBodyRef.current.translation();
        if(controls === "autoPilot"){
            rotationMatrix.lookAt(
                new THREE.Vector3(rocketBodyRefVector.x, rocketBodyRefVector.y, rocketBodyRefVector.z),
                targetRef.current.position, 
                rocketMeshRef.current.up 
            );
        }else if(controls === "mouse"){
            rotationMatrix.lookAt(
                new THREE.Vector3(rocketBodyRefVector.x, rocketBodyRefVector.y, rocketBodyRefVector.z),
                new THREE.Vector3(state.pointer.x, state.pointer.y, 0), 
                rocketMeshRef.current.up 
            );
        }

        targetQuaternion.setFromRotationMatrix( rotationMatrix );
    }


    const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }


    window.addEventListener('resize', onWindowResize);


    const RotatedRocket = (
        props: {rotate: {x: number, y: number, z: number}}
    ) => {
        //Can't apply rotatiion to the model of the rocket via a primitive directly, 
        //but it needs to be rotated for the lookAt() function to work correctly in this context
        const { rotate } = props;
        const rocket = rocketModel.scene;
        rocket.rotateX(rotate.x);
        rocket.rotateY(rotate.y);
        rocket.rotateZ(rotate.z);
        return (
            <primitive object={rocket} />
        ); 
    }


    return (
        <>
        {/* Rocket */}
            <Trail 
                width={1}
                color={'#FF4F00'}
                length={1.5}
                decay={.1}
                local={false}
                stride={0}
                interval={2}
                attenuation={(width) => width}
            >
                <RigidBody ref={rocketBodyRef}>
                    <mesh scale={0.1} ref={rocketMeshRef}>
                        <RotatedRocket rotate={{x: -degToRad(90), y: 0, z: 0}} />
                    </mesh>
                </RigidBody>
            </Trail>
        {/* Rocket Target */}
            <mesh ref={targetRef}>
                <sphereGeometry args={[0.05]} />
                <meshBasicMaterial transparent opacity={0.0} color={0xff0000} />
            </mesh>
        {/* 3D Target Bounds */}
            <mesh>
                <sphereGeometry args={[2, 32, 32]} />
                <meshBasicMaterial color={0xcccccc} wireframe transparent opacity={0.0} />
            </mesh>
        </>
    );
}

const RocketStatic = ({controls}: {controls: "autoPilot" | "mouse"}) => {
    return (
        <Suspense fallback={null}>
            <Scene controls={controls}/>
        </Suspense>
    );
}

export default RocketStatic;