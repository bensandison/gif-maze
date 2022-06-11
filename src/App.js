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
import { useRef, useState } from "react";

export default function App() {
	const [isFocused, setIsFocused] = useBoolean(false);
	const [isError, setIsError] = useBoolean(false);
	const [isSearching, setIsSearching] = useBoolean(false);
	const [searchQuery, setSearchQuery] = useState("");

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
				<Main isSearchFocused={isFocused}></Main>
			</Box>
		</Box>
	);
}
