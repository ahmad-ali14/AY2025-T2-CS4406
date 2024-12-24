import * as THREE from "three";
import { createBaseScene } from "../utils/createBaseScene";
import { createTextSprite } from "../utils/createTextSprite";

const earthImageUrls = [
    "https://upload.wikimedia.org/wikipedia/commons/c/cf/WorldMap-A_non-Frame.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/The_Earth_seen_from_Apollo_17.jpg/300px-The_Earth_seen_from_Apollo_17.jpg",
];
const moonImageUrls = [
    "https://upload.wikimedia.org/wikipedia/commons/d/db/Moonmap_from_clementine_data.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/FullMoon2010.jpg/280px-FullMoon2010.jpg",
];
const {
    render,
    scene,
    directionalLight,
    renderer,
    canvas,
    camera,
    shouldShowLabels,
    shouldShowWireframe,
    sidebar,
    addHelpNote,
    ambientLight,
} = createBaseScene({
    sceneTitle: "Unit 6: Earth and Moon",
    cameraZ: window.innerHeight / 3,
    cameraFov: 90,
    defaultLightColor: "#fdfbd3", // sun light color
    showAxes: false,
    showGrid: false,
    useAmbientLight: true,
    usePointLight: false,
});

// a base number that all other numbers will be relative to
const bl = 100;
const sceneEdges = {
    top: canvas.height / 2,
    bottom: -canvas.height / 2,
    left: -canvas.width / 2,
    right: canvas.width / 2,
};

const earthGeometry = new THREE.SphereGeometry(bl, 32, 32);
const earthMaterial = new THREE.MeshStandardMaterial({
    wireframe: shouldShowWireframe(),
    map: new THREE.TextureLoader().load(earthImageUrls[0]!),
});

const earth = new THREE.Mesh(earthGeometry, earthMaterial);

const moonGeometry = new THREE.SphereGeometry(bl / 3, 32, 32);
const moonMaterial = new THREE.MeshStandardMaterial({
    wireframe: shouldShowWireframe(),
    map: new THREE.TextureLoader().load(moonImageUrls[0]!),
});

const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.x = bl * 2; // move moon to the right of the earth

scene.add(earth, moon);

const rotateEarth = () => {
    earth.rotation.y += bl / 10000;
};

const rotateMoon = () => {
    moon.rotation.y += bl / 10000;
};

// move moon around earth
const moveMoonAroundEarth = () => {
    moon.position.x = bl * 2 * Math.cos(earth.rotation.y);
    moon.position.z = bl * 2 * Math.sin(earth.rotation.y);
};

/**
 * Setup sun light:
 * - position: center right of the screen
 */
directionalLight.position.set(sceneEdges.right, 0, 0);
directionalLight.intensity = 2;

//setup a low-intensity ambient light to reduce blackness
ambientLight.intensity = bl / 9500;

/**
 * Handling shadows:
 * - configure necessary objects to cast and receive shadows.
 * - configure the directional light position and other properties.
 * - set the light source at the top left corner of the canvas.
 * - configure the shadow camera properties.
 */
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

earth.castShadow = true;
earth.receiveShadow = true;
moon.castShadow = true;
moon.receiveShadow = true;

const dlCameraFactor = 20;
directionalLight.castShadow = true;
directionalLight.shadow.camera.near = bl * dlCameraFactor * 0;
directionalLight.shadow.camera.far = bl * dlCameraFactor;
directionalLight.shadow.camera.left = -bl * dlCameraFactor;
directionalLight.shadow.camera.right = bl * dlCameraFactor;
directionalLight.shadow.camera.top = bl * dlCameraFactor;
directionalLight.shadow.camera.bottom = -bl * dlCameraFactor;

const animate = () => {
    requestAnimationFrame(animate);
    rotateEarth();
    rotateMoon();
    moveMoonAroundEarth();
    render();
};

animate();
