import Head from "next/head";
import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

export default function Home() {
	return (
		<>
			<Head>
				<title>GIF Maze!</title>
				<meta name="description" content="Trawl through a maze of gifs!" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
		</>
	);
}
