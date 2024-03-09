'use client';
import React, { Suspense, useRef } from 'react'
import * as THREE from "three";


import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";

import Space from "./Space.Component";
import Planet from './Planet.Component';
import { OrbitControls } from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import RocketStatic from './RocketStatic.Component';
import AsteroidStorm from './AsteroidStorm.Component';
import Asteroid from './Asteroid.Component';
import { Stars } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';


const BackgroundScene = ({controls}: {controls: "autoPilot" | "mouse"}) => {

    const textureUrl = "/3d/nebula/textures/emissive.jpg";

    const texture = new THREE.CubeTextureLoader().load([
        textureUrl, textureUrl, textureUrl, textureUrl, textureUrl, textureUrl
    ])


    const {scene: model} = useLoader(GLTFLoader, "/3d/planets/aerial_rocks_02.gltf")

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
                    <AsteroidStorm model={model}/>
                    <Planet model={model}/>
                    <RocketStatic controls={controls} />
                </Physics>
            </Suspense>
            </Canvas>
        </div>
     )
}

export default BackgroundScene