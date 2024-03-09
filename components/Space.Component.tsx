import React, { Suspense, useRef } from 'react'
import { GLTFLoader } from 'three/examples/jsm/Addons.js';
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { Box3, Group, Mesh, Vector3 } from 'three';

const Space = () => {

    const model = useLoader(GLTFLoader, "/3d/space/scene.gltf");

    const {camera, scene} = useThree();
    const groupRef = useRef<Group>(null!);
    const meshRef = useRef<Mesh>(null!);

    React.useEffect(() => {
        const box3 = new Box3().setFromObject(meshRef.current);
        const center = new Vector3();
        box3.getCenter(center);
        meshRef.current.position.sub(center);  // center the model
        meshRef.current.position.y = 0;  // adjust model position
      }, [scene]);

    camera.position.z = 5;
    camera.position.y = 30;

    useFrame((state) => {
        if(groupRef.current){
            //ref.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.0003) + 0.7;
            groupRef.current.rotation.y += 0.00008;
        }
    })

    //values [-1.5, -1.3, 7]

    return (
        <Suspense>
            <group scale={[1800, 1800, 1800]} position={[400,-500, -2500]} rotation={[1, 0, 0.2]} ref={groupRef}>
                <mesh ref={meshRef} visible={true} castShadow receiveShadow>
                    <primitive object={model.scene} />
                </mesh>
            </group>
        </Suspense>
    )
}

export default Space