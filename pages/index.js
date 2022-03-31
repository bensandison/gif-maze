import Head from "next/head";
import { Canvas } from "@react-three/fiber";
import useSWR from "swr";
import Scene from "../components/scene";

// Fetcher function for SWR:
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
	const { data, error } = useSWR(
		"https://api.giphy.com/v1/gifs/trending?api_key=oPZIFR2MwFPrKArMQHVdBAoumQciakeQ",
		fetcher
	);

	console.log(data);

	if (error) return <div>failed to load data</div>;
	if (!data) return <div>loading...</div>;

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
