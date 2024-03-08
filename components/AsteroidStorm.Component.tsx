import React from 'react'
import Asteroid from './Asteroid.Component'
import { GLTF } from 'three/examples/jsm/Addons.js'
import { ObjectMap } from '@react-three/fiber'
import { Group, Object3DEventMap } from 'three';

interface AsteroidStormProps{
    model: Group<Object3DEventMap>;
}

const AsteroidStorm = (props: AsteroidStormProps) => {
    const {model} = props;

    return (
        <>
            <Asteroid model={model} scale={[0.1, 0.1, 0.1]} speed={30} position={[0,0,0]} />
            <Asteroid model={model} scale={[0.1, 0.1, 0.1]} speed={30} position={[3,26,5]} />
            <Asteroid model={model} scale={[0.1, 0.1, 0.1]} speed={30} position={[7,35,10]} />
            <Asteroid model={model} scale={[0.1, 0.1, 0.1]} speed={30} position={[-8,40,-8]} />
            <Asteroid model={model} scale={[0.1, 0.1, 0.1]} speed={30} position={[10,33,-5]} />
            <Asteroid model={model} scale={[0.1, 0.1, 0.1]} speed={30} position={[-7,31,11]} />
            <Asteroid model={model} scale={[0.1, 0.1, 0.1]} speed={30} position={[6,29,12]} />
            <Asteroid model={model} scale={[0.1, 0.1, 0.1]} speed={30} position={[1,38,-4]} />
        </>
    )
    }

export default AsteroidStorm