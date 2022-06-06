import { useEffect, useState } from "react";
import Wall from "./wall";
import { mazeGenerator } from "@miketmoore/maze-generator";

const cellSize = 3;
const halfCell = cellSize / 2;
const noOfCells = 10;

export default function Maze() {
	const [maze, setMaze] = useState(null);

	useEffect(() => {
		const m = mazeGenerator({
			rows: noOfCells,
			columns: noOfCells,
		});

		setMaze(<MazeThree maze={m}></MazeThree>);
	}, []);

	return maze;
}

function MazeThree({ maze, query }) {
	// For fetching gifs:
	const [data, setData] = useState();
	const [error, setError] = useState();
	// Fetch data when query changes:
	useEffect(() => {
		fetchData(query, setData, setError); //TODO: parse query
	}, [query]);

	// Function gets next gif in array;
	let gifIndex = -1;
	function getGif() {
		// increment to next gif:
		gifIndex++;

		// Return if there are no gifs
		if (!data || !data.length || gifIndex > data.length - 1) return;
		if (!data[gifIndex]) return;
		if (!data[gifIndex].images) return;

		return data[gifIndex].images.looping.mp4;
	}

	// Offset for calculating wall position
	const offset = noOfCells * -0.5 * cellSize + cellSize * 0.5;

	// Generate Maze:
	let mazeWalls = [];
	maze.forEachRow((row, x) => {
		row.forEach((cell, y) => {
			const walls = cell.getWalls();

			if (x === 0) {
				mazeWalls.push(
					<Wall
						key={`left-wall-${x}-${y}`}
						position={[
							offset + halfCell + x * cellSize,
							0,
							offset + y * cellSize,
						]}
						size={cellSize}
						url={getGif()}
					/>
				);
			}
			if (y === 0) {
				mazeWalls.push(
					<Wall
						key={`north-wall-${x}-${y}`}
						position={[
							offset + x * cellSize,
							0,
							offset + halfCell + y * cellSize,
						]}
						isRotate={true}
						size={cellSize}
						url={getGif()}
					/>
				);
			}

			if (walls.south) {
				mazeWalls.push(
					<Wall
						key={`south-wall-${x}-${y}`}
						position={[
							offset + halfCell + x * cellSize,
							0,
							offset + y * cellSize,
						]}
						size={cellSize}
						url={getGif()}
					/>
				);
			}
			if (walls.east) {
				mazeWalls.push(
					<Wall
						key={`east-wall-${x}-${y}`}
						position={[
							offset + x * cellSize,
							0,
							offset + halfCell + y * cellSize,
						]}
						isRotate={true}
						size={cellSize}
						url={getGif()}
					/>
				);
			}
		});
	});

	return <group>{mazeWalls}</group>;
}

async function fetchData(query, setData, setError) {
	//TODO: set change urls:
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
