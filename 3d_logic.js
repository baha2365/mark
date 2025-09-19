import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 13;

const scene = new THREE.Scene();
let Ellie;
let mixer;
const loader = new GLTFLoader();
loader.load('/Ellie.glb',
    function (gltf) {
        Ellie = gltf.scene;
        Ellie.position.y = -0.5;
        Ellie.position.x = 1;
        scene.add(Ellie);

        mixer = new THREE.AnimationMixer(Ellie);
        mixer.clipAction(gltf.animations[1]).play();
    },
    function (xhr) {},
    function (error) {}
);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
// document.getElementById('container3D').appendChild(renderer.domElement);

// light
// Renderer баптау
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.5; // жарықтықты арттырады


const topLight = new THREE.DirectionalLight(0xffffff, 2);
topLight.position.set(5, 10, 10);
scene.add(topLight);

// Қосымша шам
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);


const reRender3D = () => {
    requestAnimationFrame(reRender3D);
    renderer.render(scene, camera);
    if(mixer) mixer.update(0.002);
};
reRender3D();

