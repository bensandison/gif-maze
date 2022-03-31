import Head from "next/head";
import { Canvas } from "@react-three/fiber";
import useSWR from "swr";
import Scene from "../components/scene";

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
	return data.data;
};

export default function Home() {
	const { data, error } = useSWR(
		"https://api.giphy.com/v1/gifs/trending?api_key=oPZIFR2MwFPrKArMQHVdBAoumQciakeQ",
		fetcher
	);

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
				<Scene></Scene>
			</Canvas>
		</>
	);
}
