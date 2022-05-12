import Wall from "../components/wall";
import {
	FirstPersonControls,
	PointerLockControls,
	OrbitControls,
	FlyControls,
	PerspectiveCamera,
} from "@react-three/drei";
import Control from "../components/control";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Scene({ data, error }) {
	const { camera } = useThree();

	const walkIncrement = 0.2;

	const [zPos, setZPos] = useState(camera.position.z);
	useHotkeys("a", () => {
		setZPos((prevZ) => prevZ + walkIncrement);
	});
	useHotkeys("d", () => {
		setZPos((prevZ) => prevZ - walkIncrement);
	});

	const [xPos, setXPos] = useState(camera.position.x);
	useHotkeys("s", () => {
		setXPos((prevX) => prevX + walkIncrement);
	});
	useHotkeys("w", () => {
		setXPos((prevX) => prevX - walkIncrement);
	});

	useFrame(() => {
		camera.position.set(xPos, 0, zPos);
	});

	return (
		<>
			{/* <PointerLockControls /> */}
			<Control></Control>
			<color attach="background" args={["gray"]} />
			<ambientLight />
			{data.map((gifInfo, key) => (
				<Wall url={gifInfo.images.original_mp4.mp4} xPos={key} key={key}></Wall>
			))}
		</>
	);
}
