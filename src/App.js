import Main from "./components/main";

export default function App() {
	return (
		<>
			<nav
				style={{
					height: "10vh",
					display: "flex",
					alignItems: "center",
					gap: 5,
					paddingLeft: 20,
					paddingRight: 20,
				}}
			>
				<h1
					style={{
						margin: 0,
						fontSize: 40,
						fontFamily: "monospace",
					}}
				>
					GifMaze!
				</h1>
			</nav>
			<main style={{ height: "100vh" }}>
				<Main></Main>
			</main>
		</>
	);
}
