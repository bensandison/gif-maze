import { useEffect, useState } from "react";
import Wall from "./wall";

export default function Maze() {
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

	useEffect(() => {
		fetchData();
	});

	if (!data) return null; //TODO:

	return (
		<>
			{data.map((gifInfo, key) => (
				<Wall url={gifInfo.images.original_mp4.mp4} xPos={key} key={key}></Wall>
			))}
		</>
	);
}
