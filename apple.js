let list_of_electronics = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
let phone_list = document.getElementById("list_electr_white");

fetch("electronics.json")
  .then(response => response.json())
  .then(data => {
    list_of_electronics = data;


    let filtered = list_of_electronics.filter(phone =>
      phone.name.toLowerCase().includes("iphone")
    );

    renderPhoneList(filtered);
  })
  .catch(error => console.error("Error loading JSON:", error));

function renderPhoneList(array) {
  phone_list.innerHTML = "";

  array.forEach(phone => {
    let item = document.createElement('li');
    item.classList.add("product-card");

    item.addEventListener("click", () => {
      window.location.href = `description.html?id=${encodeURIComponent(phone.name)}`;
    });

    let img = document.createElement('img');
    img.src = phone.images[0];
    img.alt = phone.name;
    img.style.width = "200px";

    let name = document.createElement('p');
    name.textContent = phone.name;

    let price = document.createElement('h4');
    price.textContent = phone.price;

    let buttons = document.createElement('button');
    buttons.textContent = 'Buy';
    buttons.classList.add("buy-btn");

    buttons.addEventListener('click', (e) => {
      e.stopPropagation();
      alert(`${phone.name} purchased!`);
    });

    let heartButton = document.createElement('button');
    let heartIcon = document.createElement('i');

    if (favorites.includes(phone.name)) {
      heartIcon.classList.add("fa-solid", "fa-heart");
    } else {
      heartIcon.classList.add("fa-regular", "fa-heart");
    }
    heartIcon.style.color = "red";

    heartButton.appendChild(heartIcon);
    heartButton.classList.add("heart_button");

    heartButton.addEventListener("click", (e) => {
      e.stopPropagation();
      if (favorites.includes(phone.name)) {
        favorites = favorites.filter(fav => fav !== phone.name);
        heartIcon.classList.remove("fa-solid");
        heartIcon.classList.add("fa-regular");
      } else {
        favorites.push(phone.name);
        heartIcon.classList.remove("fa-regular");
        heartIcon.classList.add("fa-solid");
      }
      localStorage.setItem("favorites", JSON.stringify(favorites));
    });

    item.appendChild(img);
    item.appendChild(name);
    item.appendChild(price);
    item.appendChild(buttons);
    item.appendChild(heartButton);

    phone_list.appendChild(item);
  });
}


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
let Apple;
const loader = new GLTFLoader();
loader.load('/Apple_logo.glb',
    function (gltf) {
        Apple = gltf.scene;
        Apple.position.y = -0.5;
        Apple.position.x = 1;
        Apple.position.z = -50;
        scene.add(Apple);
    },
    function (xhr) {},
    function (error) {}
);
const renderer = new THREE.WebGLRenderer({alpha: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

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

    if (Apple) {
        Apple.rotation.y += 0.003;
    }

    renderer.render(scene, camera);
};
reRender3D();


