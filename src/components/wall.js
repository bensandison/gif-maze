import { useEffect, useState } from "react";
import * as THREE from "three";

export default function Wall({ url, position, isRotate, size }) {
	// Create video dom element:
	const [video, setVideo] = useState(() => {
		return Object.assign(document.createElement("video"), {
			class: { position },
			src: url,
			crossOrigin: "anonymous",
			loop: true,
			muted: true,
		});
	});

	useEffect(() => {
		video.play();
	}, [video]);

	// Rotate based on isRotate
	const rotDeg = Math.PI / 2;
	return (
		<mesh position={position} rotation={[0, isRotate ? 0 : rotDeg, 0]}>
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
