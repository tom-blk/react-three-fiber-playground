/* import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

interface RockModelProps {
    position: [number, number, number];
    rotation: [number, number, number];
    size: number;
}

const  RockModel = (props: RockModelProps) => {

    const { position, rotation, size } = props;

    const { nodes, materials } = useLoader(GLTFLoader, "/3d/planets/aerial_rocks_02.gltf")

    console.log(Object.keys(nodes));


    return (
      <group
        position={position}
        dispose={null}
        rotation={rotation}
        scale={[size, size, size]}
      >
        <mesh
          geometry={nodes.sphere_gltf.geometry}
          material={materials.material}
        />
      </group>
    );
}

export default RockModel; */