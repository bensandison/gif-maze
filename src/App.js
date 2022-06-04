import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { FPSControls } from "react-three-fpscontrols";
import Maze from "./components/maze";
import * as THREE from "three";

export default function App() {
	return (
		<>
			<Canvas shadows dpr={[1, 2]}>
				<Suspense fallback={null}>
					<FPSControls
						enableJoystick={true}
						enableKeyboard={true}
						camProps={{
							makeDefault: true,
							fov: 80,
							position: [0, 0.1, 0],
						}}
						orbitProps={{
							target: [0, 0.1, 0],
						}}
					/>
					<ambientLight />
					<mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
						<planeGeometry args={[100, 100]}></planeGeometry>
						<meshBasicMaterial
							color="black"
							side={THREE.DoubleSide}
						></meshBasicMaterial>
					</mesh>
					<Maze></Maze>
				</Suspense>
			</Canvas>
			<Loader />
		</>
	);
}
