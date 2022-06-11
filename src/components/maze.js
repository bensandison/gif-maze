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
	function getGif(index) {
		console.log(index);
		// Return null if there are no gifs:
		if (!data || !data.length || index > data.length - 1) return;
		if (!data[index]) return;
		if (!data[index].images) return;

		let url = data[index].images.looping.mp4;
		console.log(index, url);
		return url;
	}

	// Offset for calculating wall position
	const offset = noOfCells * -0.5 * cellSize + cellSize * 0.5;

	// Generate Maze:
	let mazeWalls = [];
	let index = 0;
	maze.forEachRow((row, x) => {
		row.forEach((cell, y) => {
			const walls = cell.getWalls();

			if (x === 0) {
				index++;
				mazeWalls.push(
					<Wall
						key={`left-wall-${x}-${y}`}
						position={[
							offset + halfCell + x * cellSize,
							0,
							offset + y * cellSize,
						]}
						size={cellSize}
						url={getGif(index)}
					/>
				);
			}
			if (y === 0) {
				index++;
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
						url={getGif(index)}
					/>
				);
			}

			if (walls.south) {
				index++;
				mazeWalls.push(
					<Wall
						key={`south-wall-${x}-${y}`}
						position={[
							offset + halfCell + x * cellSize,
							0,
							offset + y * cellSize,
						]}
						size={cellSize}
						url={getGif(index)}
					/>
				);
			}
			if (walls.east) {
				index++;
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
						url={getGif(index)}
					/>
				);
			}
		});
	});

	return <group>{mazeWalls}</group>;
}

async function fetchData(query, setData, setError) {
	//TODO: set change urls:

	const offsetArr = [0, 50, 100];

	let dataArr = [];
	for (const offset of offsetArr) {
		const [data, error] = await fetchBatch(offset);
		if (error) break;
		dataArr.push(...data);
	}
	if (!dataArr) setError(true);

	setData(dataArr);
}

async function fetchBatch(offset) {
	let url = `https://api.giphy.com/v1/gifs/trending?offset=${offset}&limit=50&bundle=low_bandwidth1&api_key=oPZIFR2MwFPrKArMQHVdBAoumQciakeQ`;

	const res = await fetch(url);
	const data = await res.json();

	if (!res.ok) {
		console.log("An error occured while fetching gifs");

		return [null, true];
	}
	return [data.data, false];
}
