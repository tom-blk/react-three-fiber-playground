/* import React from "react";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

const  RockModel = () => {

    const { nodes, materials } = useLoader(GLTFLoader, "/3d/planets/aerial_rocks_02.gltf")


    return (
      <group
        dispose={null}
        rotation={[Math.PI, 0, -Math.PI / 2]}
        scale={[1, 1, 1]}
      >
        <mesh
          geometry={nodes.aerial_rocks_02.}
          material={materials.material}
        />
      </group>
    );
} */