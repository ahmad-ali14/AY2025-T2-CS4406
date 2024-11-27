import * as THREE from "three";
import { createBaseScene } from "../utils/createBaseScene";
import { createTextSprite } from "../utils/createTextSprite";

const {
    scene,
    render,
    addHelpNote,
    shouldShowWireframe,
    shouldShowLabels,
    sidebar,
} = createBaseScene({
    sceneTitle: "Unit 2: Polygon with 5 vertices",
    cameraZ: 20,
});

const geometry = new THREE.BufferGeometry();

/**
 * Creating 10 vertices for two faces of 3D pentagon.
 */
// prettier-ignore
const vertices = new Float32Array([
    0.0,  5.0,  0.0, // Top
    4.8,  1.5,  0.0, // Top-right
    3.0,  -4.0, 0.0, // Bottom-right
    -3.0, -4.0, 0.0, // Bottom-left
    -4.8, 1.5,  0.0, // Top-left
    0.0,  5.0,  5.0, // Top - back
    4.8,  1.5,  5.0, // Top-right - back
    3.0,  -4.0, 5.0, // Bottom-right - back
    -3.0, -4.0, 5.0, // Bottom-left - back
    -4.8, 1.5,  5.0, // Top-left - back
  ]);

/**
 * Arranging the vertices into faces (triangles) of 3 vertices each.
 * Each line below contains 3 numbers that are indexes of vertices that form a face.
 * This is important to define the mesh structure so that it can be textured, shaded, and rendered.
 */
// prettier-ignore
const indices = [
  0, 1, 2, 
  0, 2, 3, 
  0, 3, 4, 
  5, 6, 7, 
  5, 7, 8, 
  5, 8, 9, 
  0, 5, 1, 
  1, 6, 2,
  6, 7, 2,
  2, 7, 3,
  7, 8, 3,
  3, 8, 4,
  8, 9, 4,
  4, 9, 0,
  9, 5, 0,  
  1, 5, 6,
  3, 4, 8,
  2, 3, 8,
  2, 8, 7,
];

/**
 * Attaching the vertices and faces to the geometry object.
 * Computing the normal vectors is important for shading, interaction with light sources, and remove hidden surfaces.
 */
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
geometry.setIndex(indices);
geometry.computeVertexNormals();
// geometry.computeBoundingSphere();

/**
 * Organizing faces into groups, so that we can apply separate materials to each group.
 */
geometry.addGroup(0, 3, 0);
geometry.addGroup(3, 3, 1);
geometry.addGroup(6, 3, 2);
geometry.addGroup(9, 3, 3);
geometry.addGroup(12, 3, 4);
geometry.addGroup(15, 3, 0);
geometry.addGroup(18, 3, 1);
geometry.addGroup(21, 3, 2);
geometry.addGroup(24, 3, 3);
geometry.addGroup(27, 3, 4);
geometry.addGroup(30, 3, 0);
geometry.addGroup(33, 3, 1);
geometry.addGroup(36, 3, 2);
geometry.addGroup(39, 3, 3);
geometry.addGroup(42, 3, 4);
geometry.addGroup(45, 3, 0);

/**
 * @returns Random shade of red color
 */
const shadeOfRed = () => {
    const r = THREE.MathUtils.randInt(200, 255);
    return new THREE.Color(`rgb(${r}, 0, 0)`);
};

const baseMaterial: THREE.MeshLambertMaterialParameters = {
    polygonOffset: true,
    polygonOffsetUnits: 1,
    polygonOffsetFactor: 1,
    side: THREE.DoubleSide,
    flatShading: false,
    blending: THREE.NoBlending,
    wireframe: false,
    wireframeLinecap: "round",
    wireframeLinejoin: "round",
    wireframeLinewidth: 500,
    color: `rgb(255, 0, 0)`,
};

const createFaceMaterial = () => {
    return new THREE.MeshLambertMaterial({
        ...baseMaterial,
        color: shadeOfRed(),
    });
};

/**
 * Creating a separate material for each face.
 * All material are almost identical, except for the color that is slightly different for each face.
 */
const materials = [
    createFaceMaterial(),
    createFaceMaterial(),
    createFaceMaterial(),
    createFaceMaterial(),
    createFaceMaterial(),
    createFaceMaterial(),
    createFaceMaterial(),
    createFaceMaterial(),
    createFaceMaterial(),
    createFaceMaterial(),
];

/**
 * Define the mesh and add it to the scene.
 */
const mesh = new THREE.Mesh(geometry, materials);
scene.add(mesh);

const numVertices = vertices.length / 3;

const verticesLabels: THREE.Sprite<THREE.Object3DEventMap>[] = [];

for (let i = 0; i < numVertices; i++) {
    const x = vertices[i * 3] || 0;
    const y = vertices[i * 3 + 1] || 0;
    const z = vertices[i * 3 + 2] || 0;

    const label = createTextSprite(`V${i}`);
    label.position.set(x, y, z);
    label.visible = false;

    mesh.add(label);
    verticesLabels.push(label);
}

// let's label the faces according to the indices and groups
// label should be F + group number (0-indexed)
const faceLabels: THREE.Sprite<THREE.Object3DEventMap>[] = [];

for (let i = 0; i < geometry.groups.length; i++) {
    const group = geometry.groups[i];
    if (!group) {
        continue;
    }
    const faceLabel = createTextSprite(`F${i}`);
    const groupVerticesIndexes = [
        indices[group.start],
        indices[group.start + 1],
        indices[group.start + 2],
    ];

    const faceCenterCoords = groupVerticesIndexes.reduce(
        (acc, vertexIndex) => {
            if (vertexIndex === undefined) {
                return acc;
            }
            acc.x += vertices[vertexIndex * 3] || 0;
            acc.y += vertices[vertexIndex * 3 + 1] || 0;
            acc.z += vertices[vertexIndex * 3 + 2] || 0;
            return acc;
        },
        { x: 0, y: 0, z: 0 },
    );

    const faceCenter = new THREE.Vector3(
        faceCenterCoords.x / 3,
        faceCenterCoords.y / 3,
        faceCenterCoords.z / 3,
    );
    faceLabel.position.set(faceCenter.x, faceCenter.y, faceCenter.z);
    faceLabel.visible = false;
    mesh.add(faceLabel);
    faceLabels.push(faceLabel);
}

let shouldRotate = true;
let rotationSpeed = 0.01;
let rotationAxis = "y";
let rotationDirection = 1;
let showFacesLabels = false;

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
            <input type="checkbox" id="showFacesLabels">
            <label for="showFacesLabels" class="font-bold">Show Face Labels</label>
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

const showFacesLabelsCheckbox = document.getElementById(
    "showFacesLabels",
) as HTMLInputElement;

rotateCheckbox.checked = shouldRotate;
rotationSpeedInput.value = rotationSpeed.toString();
rotationAxisSelect.value = rotationAxis;
rotationDirectionSelect.value = rotationDirection.toString();
showFacesLabelsCheckbox.checked = showFacesLabels;

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

showFacesLabelsCheckbox.addEventListener("change", () => {
    showFacesLabels = showFacesLabelsCheckbox.checked;
});

const rotateMesh = () => {
    if (shouldRotate) {
        mesh.rotation[rotationAxis as "x" | "y"] +=
            rotationSpeed * rotationDirection;
    }
};

const resetMeshRotation = () => {
    shouldRotate = false;
    rotateCheckbox.checked = false;
    mesh.rotation.set(0, 0, 0);
};

const resetRotationButton = document.getElementById(
    "resetRotation",
) as HTMLButtonElement;
resetRotationButton.addEventListener("click", resetMeshRotation);

const animate = () => {
    materials.forEach((material) => {
        const isWireframe = shouldShowWireframe();
        material.wireframe = isWireframe;
    });

    verticesLabels.forEach((label) => {
        label.visible = shouldShowLabels();
    });

    faceLabels.forEach((label) => {
        label.visible = shouldShowLabels() && showFacesLabels;
    });

    rotateMesh();
    requestAnimationFrame(animate);
    render();
};

animate();

addHelpNote({
    title: "Scene Options",
    description: "These options are specified for this scene:",
    points: [
        "Rotate: Start/Stop the rotation of the mesh.",
        "Rotation Speed: Adjust the speed of rotation. Default is 0.01.",
        "Rotation Axis: Change the axis of rotation, the shape will rotate around this axis.",
        "Rotation Direction: Change the direction of rotation. Default is clockwise.",
        "Show Face Labels: Show/Hide labels for each face. The global 'Show Labels' control option should be enabled.",
        "Reset Rotation: Stop the rotation and reset the shape's rotation to the last state before rotation started.",
    ],
});
