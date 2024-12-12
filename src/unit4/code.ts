import * as THREE from "three";
import { createBaseScene } from "../utils/createBaseScene";

const { render, scene, sidebar, addHelpNote } = createBaseScene({
    sceneTitle: "Unit 4: Textured Cube",
    cameraZ: window.innerHeight,
    defaultLightColor: "#ffffff",
    showAxes: false,
    showGrid: false,
});

const defaultCubeSideLength = 500;
const cubeGeometry = new THREE.BoxGeometry(
    defaultCubeSideLength,
    defaultCubeSideLength,
    defaultCubeSideLength,
);

// put an image on each face of the cube
const cubeMaterials = [
    // right side
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./images/1.jpg"),
    }),
    // left side
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./images/2.jpg"),
    }),
    // top side
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    // bottom side
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    // front side
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./images/3.jpeg"),
    }),
    // back side
    new THREE.MeshBasicMaterial({
        map: new THREE.TextureLoader().load("./images/4.jpg"),
    }),
];

const cube = new THREE.Mesh(cubeGeometry, cubeMaterials);
scene.add(cube);

let shouldRotate = true;
let rotationSpeed = 0.01;
let rotationAxis = "y";
let rotationDirection = 1;

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
            <input type="range" id="rotationSpeed" min="0" max="0.1" step="0.01" value="0.01">
        </div>
        <div>
            <label for="cubeSideLength" class="font-bold">Cube Side Length</label>
            <input type="range" id="cubeSideLength" min="50" max="500" step="1" value="${defaultCubeSideLength}">
        </div>
        <div>
            <label for="rotationAxis" class="font-bold">Rotation Axis</label>
            <select id="rotationAxis" class="min-w-20 ml-2">
                <option value="x">x</option>
                <option value="y" selected>y</option>
                <option value="z">z</option>
            </select>
        </div>
        <div class="">
            <label for="rotationDirection" class="font-bold">Rotation Direction</label>
            <select id="rotationDirection">
                <option value="1">Clockwise</option>
                <option value="-1">Counter Clockwise</option>
            </select>
        </div>
        <div>
            <button id="resetRotation" class="bg-blue-500 text-white p-2 rounded-md text-sm">Reset Rotation</button>
        </div>
    </div>
    `;

sidebar.appendChild(sceneOptionsDiv);

const rotateCheckbox = document.getElementById("rotate") as HTMLInputElement;
const rotationSpeedInput = document.getElementById(
    "rotationSpeed",
) as HTMLInputElement;
const rotationAxisSelect = document.getElementById(
    "rotationAxis",
) as HTMLSelectElement;
const rotationDirectionSelect = document.getElementById(
    "rotationDirection",
) as HTMLSelectElement;

const cubeSideLengthInput = document.getElementById(
    "cubeSideLength",
) as HTMLInputElement;

rotateCheckbox.checked = shouldRotate;
rotationSpeedInput.value = rotationSpeed.toString();
rotationAxisSelect.value = rotationAxis;
rotationDirectionSelect.value = rotationDirection.toString();

rotateCheckbox.addEventListener("change", () => {
    shouldRotate = rotateCheckbox.checked;
});

rotationSpeedInput.addEventListener("input", () => {
    rotationSpeed = parseFloat(rotationSpeedInput.value);
});

rotationAxisSelect.addEventListener("change", () => {
    rotationAxis = rotationAxisSelect.value;
});

rotationDirectionSelect.addEventListener("change", () => {
    rotationDirection = parseInt(rotationDirectionSelect.value);
});

cubeSideLengthInput.addEventListener("input", () => {
    const newCubeSideLength = parseFloat(cubeSideLengthInput.value);
    cube.scale.set(
        newCubeSideLength / defaultCubeSideLength,
        newCubeSideLength / defaultCubeSideLength,
        newCubeSideLength / defaultCubeSideLength,
    );
});

const rotateCube = () => {
    if (shouldRotate) {
        cube.rotation[rotationAxis as "x" | "y"] +=
            rotationSpeed * rotationDirection;
    }
};

const resetCubeRotation = () => {
    shouldRotate = false;
    rotateCheckbox.checked = false;
    cube.rotation.set(0, 0, 0);
};

const resetRotationButton = document.getElementById(
    "resetRotation",
) as HTMLButtonElement;
resetRotationButton.addEventListener("click", resetCubeRotation);

const animate = () => {
    requestAnimationFrame(animate); // prepare for the next frame
    rotateCube(); // rotate the cube
    render(); // re-render the scene
};

animate();

addHelpNote({
    title: "Scene Options",
    description: "These options are specified for this scene:",
    points: [
        "Rotate: Start/Stop the rotation of the mesh.",
        "Rotation Speed: Adjust the speed of rotation. Default is 0.01.",
        "Cube Side Length: Adjust the side length of the cube. Default is 500.",
        "Rotation Axis: Change the axis of rotation, the shape will rotate around this axis.",
        "Rotation Direction: Change the direction of rotation. Default is clockwise.",
        "Reset Rotation: Stop the rotation and reset the shape's rotation to the last state before rotation started.",
    ],
});
