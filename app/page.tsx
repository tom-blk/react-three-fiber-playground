import BackgroundScene from "@/components/BackgroundScene.Component";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";

export default function Home() {
  return (
    <div className={"w-screen h-screen"}>
      <BackgroundScene />
    </div>
  );
}
