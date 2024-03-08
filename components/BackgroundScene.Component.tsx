'use client';
import React, { Suspense } from 'react'
import * as THREE from "three";


import { Canvas, useThree } from "@react-three/fiber";

import Space from "./Space.Component";
import Planet from './Planet.Component';
import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import RocketStatic from './RocketStatic.Component';

const BackgroundScene = () => {

    const textureUrl = "/3d/nebula/textures/emissive.jpg";

    const texture = new THREE.CubeTextureLoader().load([
        textureUrl, textureUrl, textureUrl, textureUrl, textureUrl, textureUrl
    ])

    const SkyDome = () => {

        const {scene, viewport} = useThree();

        scene.background = texture;

        return null;
    }

    return (
        <div className={"w-full h-full"}>
            <Canvas gl={{
                pixelRatio: window.devicePixelRatio,
                antialias: true,
            }} shadows>
            <OrbitControls />
            {/* <primitive object={new THREE.AxesHelper(150)} /> */}
            <directionalLight position={[30, 10, 10]} intensity={2} />
            <pointLight position={[0, 0, 0]} intensity={3} />
            <Space/>
            <SkyDome/>
            <Suspense fallback={null}>
                <Physics gravity={[0,0,0]}>
                    <Planet />
                    <RocketStatic />
                </Physics>
            </Suspense>
            </Canvas>
        </div>
     )
}

export default BackgroundScene