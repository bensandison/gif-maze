import { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Loader } from "@react-three/drei";
import { FPSControls } from "react-three-fpscontrols";

import Wall from "./components/wall";

async function fetchData() {
	const url =
		"https://api.giphy.com/v1/gifs/trending?bundle=low_bandwidth1&api_key=oPZIFR2MwFPrKArMQHVdBAoumQciakeQ";

	const res = await fetch(url);
	const data = await res.json();

	if (!res.ok) {
		console.log("An error occured while fetching gifs");

		// Return an error from fn
		return [null, true];
	}

	return [data.data, false];
}

export default function App() {
	const [data, setData] = useState(null);
	const [error, setError] = useState(false);

	async function fetchData() {
		const url =
			"https://api.giphy.com/v1/gifs/trending?bundle=low_bandwidth1&api_key=oPZIFR2MwFPrKArMQHVdBAoumQciakeQ";

		const res = await fetch(url);
		const data = await res.json();

		if (!res.ok) {
			console.log("An error occured while fetching gifs");

			setError(true);
		}

		setData(data.data);
	}
	fetchData();

	console.log(data);

	if (!data) return <h1>loading</h1>;

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

					{/* <color attach="background" args={["red"]} /> */}
					<ambientLight />
					{data.map((gifInfo, key) => (
						<Wall
							url={gifInfo.images.original_mp4.mp4}
							xPos={key}
							key={key}
						></Wall>
					))}
				</Suspense>
			</Canvas>
			<Loader />
		</>
	);
}
