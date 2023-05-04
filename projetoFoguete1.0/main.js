import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let gltf_;

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x5d0361, 10, 1500);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// iluminação
const ambientLight = new THREE.HemisphereLight(0xffffff, 0x404040, 1);
scene.add(ambientLight);

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.shadowMap.enabled = true;

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();
loader.load(
	'./foguete.gltf',
	function ( gltf ) {
		scene.add( gltf.scene );
		gltf_ = gltf.scene;
	},

);


camera.position.z = 60;
camera.position.y=-10
camera.position.x=0


function animate() {
	
	renderer.render( scene, camera );
	
	if (gltf_) {
        gltf_.rotation.y += 0.03;   	
    }

	requestAnimationFrame( animate );
}

animate();