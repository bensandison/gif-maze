import { useEffect, useState } from "react";
import Wall from "./wall";
import { mazeGenerator } from "@miketmoore/maze-generator";

const cellSize = 3;
const halfCell = cellSize / 2;
const noOfCells = 9;

// Offset for calculating wall position
const offset = noOfCells * -0.5 * cellSize + cellSize * 0.5;

export default function Maze({ data }) {
	const [maze, setMaze] = useState(null);

	useEffect(() => {
		setMaze(
			mazeGenerator({
				rows: noOfCells,
				columns: noOfCells,
			})
		);
	}, []);

	if (!maze) return null;
	return <MazeThree maze={maze} data={data}></MazeThree>;
}

function MazeThree({ maze, data }) {
	if (!data) return null;
	console.log("hi");

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
						url={data[index].images.looping.mp4}
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
						url={data[index].images.looping.mp4}
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
						url={data[index].images.looping.mp4}
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
						url={data[index].images.looping.mp4}
					/>
				);
			}
		});
	});

	return <group>{mazeWalls}</group>;
}
