import {
	Box,
	Button,
	Flex,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from "@chakra-ui/react";
import Main from "./components/main";
import { SearchIcon } from "@chakra-ui/icons";

export default function App() {
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
				<InputGroup maxW={500} background="white" borderRadius={10}>
					<Input
						size="lg"
						variant="filled"
						placeholder="Gif Search Query"
					></Input>
					<InputRightElement h="100%">
						<Button>
							<SearchIcon></SearchIcon>
						</Button>
					</InputRightElement>
				</InputGroup>
			</Flex>
			<Box as="main" h="100vh">
				<Main></Main>
			</Box>
		</Box>
	);
}
