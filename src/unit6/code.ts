import * as THREE from "three";
import { createBaseScene } from "../utils/createBaseScene";

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
// for easy access to the edges of the scene
const sceneEdges = {
    top: canvas.height / 2,
    bottom: -canvas.height / 2,
    left: -canvas.width / 2,
    right: canvas.width / 2,
};

// earth: geometry + map + material
const earthGeometry = new THREE.SphereGeometry(bl, 32, 32);
const earthMap = new THREE.TextureLoader().load(earthImageUrls[0]!);
const earthMaterial = new THREE.MeshStandardMaterial({
    wireframe: shouldShowWireframe(),
    map: earthMap,
});
const earth = new THREE.Mesh(earthGeometry, earthMaterial);

// moon: geometry + map + material
const moonGeometry = new THREE.SphereGeometry(bl / 3, 32, 32);
const moonMap = new THREE.TextureLoader().load(moonImageUrls[0]!);
const moonMaterial = new THREE.MeshStandardMaterial({
    wireframe: shouldShowWireframe(),
    map: moonMap,
});

const moon = new THREE.Mesh(moonGeometry, moonMaterial);
moon.position.x = bl * 2; // move moon to the right of the earth

scene.add(earth, moon);

// rotate the earth around itself
const rotateEarth = () => {
    earth.rotation.y += bl / 10000;
};

// rotate the moon around itself
const rotateMoon = () => {
    moon.rotation.y += bl / 10000;
};

// move moon around earth in a circular path
const moveMoonAroundEarth = (speed = 1) => {
    moon.position.x = bl * 2 * Math.cos(earth.rotation.y * speed);
    moon.position.z = bl * 2 * Math.sin(earth.rotation.y * speed);
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

// shadow camera properties
const dlCameraFactor = 20;
directionalLight.castShadow = true;
directionalLight.shadow.camera.near = bl * dlCameraFactor * 0;
directionalLight.shadow.camera.far = bl * dlCameraFactor;
directionalLight.shadow.camera.left = -bl * dlCameraFactor;
directionalLight.shadow.camera.right = bl * dlCameraFactor;
directionalLight.shadow.camera.top = bl * dlCameraFactor;
directionalLight.shadow.camera.bottom = -bl * dlCameraFactor;

// grouping materials for easy access
const materials = [earthMaterial, moonMaterial];

/**
 * Scene Options:
 * - Rotate: Start/Stop the moon rotating around the earth.
 * - Rotation Speed: Adjust the speed of rotation. Default is 1.
 * - Rotation Direction: Change the direction of rotation. Default is counter clockwise.
 * - Rotation Axis: Change the axis of rotation, the shape will rotate around this axis.
 */
const sceneOptionsDiv = document.createElement("div");
sceneOptionsDiv.classList.add("mb-4");

sceneOptionsDiv.innerHTML = `
    <hr class="border border-b-[#000] mb-2" />
    <h2 class="text-xl font-bold text-center mb-2">Scene Options</h2>
    <div class="flex flex-col space-y-2 text-lg">
        <div>
            <input type="checkbox" id="rotate" checked>
            <label for="rotate" class="font-bold">Rotate</label>
        </div>
        <div>
            <label for="rotationSpeed" class="font-bold">Rotation Speed</label>
            <input type="range" id="rotationSpeed" min="0" max="3" step="0.01" value="0.01">
        </div>
        <div class="">
            <label for="rotationDirection" class="font-bold">Rotation Direction</label>
            <select id="rotationDirection">
                <option value="1">Clockwise</option>
                <option value="-1">Counter Clockwise</option>
            </select>
        </div>
       
    </div>
    `;

sidebar.appendChild(sceneOptionsDiv);

// control listeners
let shouldRotate = true;
let rotationSpeed = 1;
let rotationDirection = -1;

const rotateCheckbox = document.getElementById("rotate") as HTMLInputElement;
const rotationSpeedInput = document.getElementById(
    "rotationSpeed",
) as HTMLInputElement;
const rotationDirectionSelect = document.getElementById(
    "rotationDirection",
) as HTMLSelectElement;

rotateCheckbox.checked = shouldRotate;
rotationSpeedInput.value = rotationSpeed.toString();
rotationDirectionSelect.value = rotationDirection.toString();

rotateCheckbox.addEventListener("change", () => {
    shouldRotate = rotateCheckbox.checked;
});

rotationSpeedInput.addEventListener("input", () => {
    rotationSpeed = parseFloat(rotationSpeedInput.value);
});

rotationDirectionSelect.addEventListener("change", () => {
    rotationDirection = parseFloat(rotationDirectionSelect.value);
});

/**
 * Animation Loop:
 * - rotate the earth around itself
 * - rotate the moon around itself
 * - move the moon around the earth (if rotation is enabled) with a given speed
 */
const animate = () => {
    requestAnimationFrame(animate);
    rotateEarth();
    rotateMoon();
    const speed = rotationDirection * rotationSpeed;
    if (shouldRotate) moveMoonAroundEarth(speed);
    render();

    materials.forEach((material) => {
        material.wireframe = shouldShowWireframe();
    });
};

animate();

// help note: accessed  from the UI through the `Help` button.
addHelpNote({
    title: "Scene Options",
    description: "These options are specified for this scene:",
    points: [
        "Rotate: Start/Stop the moon rotating around the earth.",
        "Rotation Speed: Adjust the speed of rotation. Default is 1.",
        "Rotation Direction: Change the direction of rotation. Default is counter clockwise.",
    ],
});
