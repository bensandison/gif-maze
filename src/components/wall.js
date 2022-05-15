import { useEffect, useState } from "react";
import * as THREE from "three";

export default function Wall({ url, xPos }) {
	const size = 3;

	// Create video dom element:
	const [video] = useState(() =>
		Object.assign(document.createElement("video"), {
			src: url,
			crossOrigin: "anonymous",
			loop: true,
			muted: true,
		})
	);

	// Play video when video loads
	useEffect(() => void video.play(), [video]);

	return (
		<mesh position={[0, 0, xPos * size]} rotation={[0, Math.PI / 2, 0]}>
			<planeGeometry args={[size, size]}></planeGeometry>
			<meshBasicMaterial side={THREE.DoubleSide} toneMapped={false}>
				<videoTexture
					args={[video]}
					attach="map"
					encoding={THREE.sRGBEncoding}
				></videoTexture>
			</meshBasicMaterial>
		</mesh>
	);
}
