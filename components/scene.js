import {
	FirstPersonControls,
	PointerLockControls,
	OrbitControls,
	FlyControls,
} from "@react-three/drei";

export default function Scene(props) {
	return (
		<>
			<color attach="background" args={["gray"]} />
			<FirstPersonControls
				lookVertical={false}
				lookSpeed={0.5}
				movementSpeed={2}
			/>
			<scene>
				<ambientLight />
				{props.children}
			</scene>
		</>
	);
}
