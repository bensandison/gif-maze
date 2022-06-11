import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { FPSControls } from "react-three-fpscontrols";
import Maze from "./maze";
import * as THREE from "three";

export default function Main() {
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
							position: [0, -0.1, 0],
						}}
						orbitProps={{
							target: [0, -0.1, 0],
						}}
					/>
					<directionalLight intensity={0.6} position={[0, 2, 2]} castShadow />
					<mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -2.5, 0]}>
						<planeGeometry args={[200, 200]}></planeGeometry>
						<meshBasicMaterial
							color="#333"
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
