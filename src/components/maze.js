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
	console.log(data);

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
						url="https://media4.giphy.com/media/MBNihviBMEKb7XEF2N/giphy.mp4?cid=a01a18b282ptgazdmivszlngp8gyvifzspg538kpi10dltvc&rid=giphy.mp4&ct=g"
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
						url="https://media0.giphy.com/media/2TOi6OJP04FDu1x34F/giphy.mp4?cid=a01a18b29csc64w6x6uub4sg34i1q502wd1tf4tuql9dtvsp&rid=giphy.mp4&ct=g"
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
						url="https://media4.giphy.com/media/MBNihviBMEKb7XEF2N/giphy.mp4?cid=a01a18b282ptgazdmivszlngp8gyvifzspg538kpi10dltvc&rid=giphy.mp4&ct=g"
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
						url="https://media0.giphy.com/media/2TOi6OJP04FDu1x34F/giphy.mp4?cid=a01a18b29csc64w6x6uub4sg34i1q502wd1tf4tuql9dtvsp&rid=giphy.mp4&ct=g"
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
