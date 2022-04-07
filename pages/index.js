import Head from "next/head";
import { Canvas } from "@react-three/fiber";
import useSWR from "swr";
import Scene from "../components/scene";
import Wall from "../components/wall";

// Fetcher function for SWR:
const fetcher = async (url) => {
	const res = await fetch(url);
	const data = await res.json();

	// If api returns an error:
	if (!res.ok) {
		const error = new Error("An error occured while fetching data");
		// Set error message if api returned one
		if (data.message) error.message = data.message;
		throw error;
	}
	// No errror return gif data:
	console.log(res);
	return data.data;
};

export default function Home() {
	const { data, error } = useSWR(
		"https://api.giphy.com/v1/gifs/trending?bundle=low_bandwidth1&api_key=oPZIFR2MwFPrKArMQHVdBAoumQciakeQ",
		fetcher
	);
	console.log("hi");
	console.log(data);

	if (error) {
		return <h4>error: {error.message}</h4>;
	}

	if (!data) {
		return <div>loading...</div>;
	}

	return (
		<>
			<Head>
				<title>GIF Maze!</title>
				<meta name="description" content="Trawl through a maze of gifs!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Canvas>
				<Scene>
					{data.map((gifInfo, key) => (
						<Wall
							url={gifInfo.images.original_mp4.mp4}
							xPos={key}
							key={key}
						></Wall>
					))}
				</Scene>
			</Canvas>
		</>
	);
}
