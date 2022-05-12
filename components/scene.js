import Wall from "../components/wall";
import Control from "../components/control";

export default function Scene({ data, error }) {
	return (
		<>
			<Control></Control>
			<color attach="background" args={["gray"]} />
			<ambientLight />
			{data.map((gifInfo, key) => (
				<Wall url={gifInfo.images.original_mp4.mp4} xPos={key} key={key}></Wall>
			))}
		</>
	);
}
