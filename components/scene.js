import Box from "./box";

export default function Scene() {
	return (
		<>
			<color attach="background" args={["red"]} />
			<scene>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<Box position={[-1.2, 0, 0]} />
				<Box position={[1.2, 0, 0]} />
			</scene>
		</>
	);
}
