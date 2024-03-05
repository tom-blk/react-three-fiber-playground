'use client';
import React from 'react'
import * as THREE from "three";


import { Canvas, useThree } from "@react-three/fiber";

import Space from "./Space.Component";
import Planet from './Planet.Component';
import Rocket from './Rocket.Component';
import { OrbitControls } from '@react-three/drei';

const BackgroundScene = () => {

    const textureUrl = "/3d/nebula/textures/emissive.jpg";

    const texture = new THREE.CubeTextureLoader().load([
        textureUrl, textureUrl, textureUrl, textureUrl, textureUrl, textureUrl
    ])

    const SkyDome = () => {

        const {scene} = useThree();

        scene.background = texture;

        return null;

        /* return(
            <mesh scale={[100, 100, 100]} rotation={[20,0,200]} position={[0,0,0]}>
                <sphereGeometry args={[1000, 32, 32]} />
                <meshBasicMaterial map={texture} side={THREE.BackSide} />
            </mesh>
        )   */
    }

    return (
        <div className={"w-full h-full"}>
            <Canvas shadows>
            <OrbitControls />
            <primitive object={new THREE.AxesHelper(150)} />
            <directionalLight position={[30, 10, 10]} intensity={2} />
            <pointLight position={[0, 0, 0]} intensity={3} />
            <Space/>
            <SkyDome/>
            <Planet />
            <Rocket />
            </Canvas>
        </div>
     )
}

export default BackgroundScene