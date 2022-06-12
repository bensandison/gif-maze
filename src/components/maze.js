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

	if (!maze || !data) return null;
	return <MazeThree maze={maze} data={data}></MazeThree>;
}

function MazeThree({ maze, data }) {
	const [mazeWalls, setMazeWalls] = useState([]);

	useEffect(() => {
		// Clear old walls with new data:
		setMazeWalls([]);
	}, [data]);

	useEffect(() => {
		// Check array has been emptied and there is data before generating maze:
		if (!mazeWalls.length && data) {
			genMaze();
		}
	}, [mazeWalls]);

	// Generate Maze:
	function pushWall(wall) {
		setMazeWalls((wallsArr) => {
			return [...wallsArr, wall];
		});
	}

	function genMaze() {
		let index = 0;

		maze.forEachRow((row, x) => {
			row.forEach((cell, y) => {
				const walls = cell.getWalls();

				if (x === 0) {
					index++;
					pushWall(
						<Wall
							key={`left-wall-${x}-${y}`}
							position={[
								offset + halfCell + x * cellSize,
								0,
								offset + y * cellSize,
							]}
							size={cellSize}
							url={data[index] ? data[index].images.looping.mp4 : null}
						/>
					);
				}
				if (y === 0) {
					index++;
					pushWall(
						<Wall
							key={`north-wall-${x}-${y}`}
							position={[
								offset + x * cellSize,
								0,
								offset + halfCell + y * cellSize,
							]}
							isRotate={true}
							size={cellSize}
							url={data[index] ? data[index].images.looping.mp4 : null}
						/>
					);
				}

				if (walls.south) {
					index++;
					pushWall(
						<Wall
							key={`south-wall-${x}-${y}`}
							position={[
								offset + halfCell + x * cellSize,
								0,
								offset + y * cellSize,
							]}
							size={cellSize}
							url={data[index] ? data[index].images.looping.mp4 : null}
						/>
					);
				}
				if (walls.east) {
					index++;
					pushWall(
						<Wall
							key={`east-wall-${x}-${y}`}
							position={[
								offset + x * cellSize,
								0,
								offset + halfCell + y * cellSize,
							]}
							isRotate={true}
							size={cellSize}
							url={data[index] ? data[index].images.looping.mp4 : null}
						/>
					);
				}
			});
		});
	}

	return <group>{mazeWalls}</group>;
}
