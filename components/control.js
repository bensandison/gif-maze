import { PointerLockControls, FirstPersonControls } from "@react-three/drei";
import { useState } from "react";
import { useHotkeys } from "react-hotkeys-hook";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

export default function Control() {
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

	useHotkeys("l", () => {
		console.log("rotation");
		console.log("x: " + Math.round(camera.rotation.x * 100) / 100);
		console.log("y: " + Math.round(camera.rotation.y * 100) / 100);
		console.log("z: " + Math.round(camera.rotation.z * 100) / 100);
	});

	return <PointerLockControls position={[0, 10, 0]}></PointerLockControls>;
}
