import Layout from "../components/layout";
import "../css/reset.css";
import "../css/index.css";

export default function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}
