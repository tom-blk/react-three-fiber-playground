import React, {useRef} from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { Mesh } from 'three'

const Planet = () => {

    const ref = useRef<Mesh>(null!)

    useFrame(() => {
        if(ref.current)
        ref.current.rotation.y += 0.0008
    })

    const texture = useLoader(GLTFLoader, "/3d/planets/aerial_rocks_02.gltf")

    return (
        <mesh ref={ref} position={[40, 0, -100]} scale={[1, 1, 1]} castShadow receiveShadow>
            <primitive object={texture.scene} />
        </mesh>
    )
    }

export default Planet