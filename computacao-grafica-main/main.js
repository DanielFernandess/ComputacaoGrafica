import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

const renderer = new THREE.WebGLRenderer();
let gltf_;

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();
loader.load(
	// resource URL
	'./foguete.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		scene.add( gltf.scene );
		gltf_ = gltf.scene;
		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);
camera.position.z = 10;

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );
	if (gltf_) {
        gltf_.rotation.x += 0.01;
        gltf_.rotation.y += 0.01;
        gltf_.scale.set(0.5, 0.5, 0.5);
    }
}

animate();