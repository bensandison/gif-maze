import { Box, Flex, Text } from "@chakra-ui/react";
import Main from "./components/main";

export default function App() {
	return (
		<Box position="relative">
			<Flex
				as="nav"
				position="absolute"
				w="100%"
				bg="red"
				zIndex={2}
				paddingX={5}
			>
				<Text fontFamily="mono" fontSize="5xl">
					GifMaze
				</Text>
			</Flex>
			<Box as="main" h="100vh">
				<Main></Main>
			</Box>
		</Box>
	);
}
