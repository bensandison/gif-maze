import {
	Box,
	IconButton,
	Flex,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useBoolean,
} from "@chakra-ui/react";
import Main from "./components/main";
import { SearchIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";

export default function App() {
	const [isFocused, setIsFocused] = useBoolean(false);
	const [isSearching, setIsSearching] = useBoolean(false);
	const [searchQuery, setSearchQuery] = useState("");

	// For data fetching:
	const [data, setData] = useState(null);
	const [isError, setIsError] = useBoolean(false);
	const [isLoading, setIsLoading] = useBoolean(true);

	// Fetch data:
	useEffect(() => {
		fetchData(searchQuery, setData, setIsError, setIsLoading); //TODO: parse query
	}, [searchQuery]);

	function handleSearchSubmit() {}

	function handleOnChange(e) {
		setSearchQuery(e.target.value);
	}

	// Submit button reference:
	const submitRef = useRef(null);

	return (
		<Box position="relative">
			<Flex
				as="nav"
				position="absolute"
				w="100%"
				bg="rgba(250,0,250,0.6)"
				zIndex={2}
				paddingX={5}
				alignItems="center"
				justifyContent="space-between"
			>
				<Text fontFamily="mono" fontSize="5xl">
					GifMaze
				</Text>
				<InputGroup
					as="form"
					maxW={500}
					background="white"
					borderRadius={10}
					onSubmit={(e) => {
						e.preventDefault();
						handleSearchSubmit();
					}}
					onFocus={setIsFocused.on}
					onBlur={setIsFocused.off}
				>
					<Input
						value={searchQuery}
						onChange={handleOnChange}
						isInvalid={isError}
						size="lg"
						variant="filled"
						placeholder="Gif Search Query"
					></Input>
					<InputRightElement h="100%" pr="2">
						{isSearching ? (
							<Spinner></Spinner>
						) : (
							<IconButton
								ref={submitRef}
								variant="ghost"
								icon={<SearchIcon />}
								type="submit"
							></IconButton>
						)}
					</InputRightElement>
				</InputGroup>
			</Flex>
			<Box as="main" h="100vh">
				<Main isSearchFocused={isFocused} data={data}></Main>
			</Box>
		</Box>
	);
}

async function fetchData(query, setData, setIsError, setIsLoading) {
	//TODO: set change urls:

	// Can only fetch 50 posts at a time;
	const offsetArr = [0, 50, 100];
	let dataArr = [];
	for (const offset of offsetArr) {
		let url = `https://api.giphy.com/v1/gifs/trending?offset=${offset}&limit=50&bundle=low_bandwidth1&api_key=oPZIFR2MwFPrKArMQHVdBAoumQciakeQ`;
		const res = await fetch(url);

		if (!res.ok) {
			console.log("An error occured while fetching gifs");
			break;
		}

		let data = await res.json();
		data = data.data;

		dataArr.push(...data);
	}
	if (!dataArr) setIsError.on;

	setIsLoading.off;
	setData(dataArr);
}

async function fetchBatch(offset) {}
