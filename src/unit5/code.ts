import * as THREE from "three";
import { createBaseScene } from "../utils/createBaseScene";
import { createTextSprite } from "../utils/createTextSprite";

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
} = createBaseScene({
    sceneTitle: "Unit 5: Methane Molecule",
    cameraZ: window.innerHeight * 20,
    cameraFov: 90,
    defaultLightColor: "#ffffff",
    showAxes: false,
    showGrid: false,
});

const bondLength = 200; // bond length, a base for  other sizes and positions
const carbonRadius = bondLength / 2;
const hydrogenRadius = bondLength / 6;

const carbonAtomGeometry = new THREE.SphereGeometry(carbonRadius, 32, 32);
const carbonAtomMaterial = new THREE.MeshStandardMaterial({
    color: THREE.Color.NAMES.red,
});
const carbon___Atom = new THREE.Mesh(carbonAtomGeometry, carbonAtomMaterial);

const hydrogenAtomGeometry = new THREE.SphereGeometry(hydrogenRadius, 32, 32);
const hydrogenAtomMaterial = new THREE.MeshStandardMaterial({
    color: THREE.Color.NAMES.blue,
});

const hydrogenAtom1 = new THREE.Mesh(
    hydrogenAtomGeometry,
    hydrogenAtomMaterial,
);
const hydrogenAtom2 = new THREE.Mesh(
    hydrogenAtomGeometry,
    hydrogenAtomMaterial,
);
const hydrogenAtom3 = new THREE.Mesh(
    hydrogenAtomGeometry,
    hydrogenAtomMaterial,
);
const hydrogenAtom4 = new THREE.Mesh(
    hydrogenAtomGeometry,
    hydrogenAtomMaterial,
);

const bondGeometry = new THREE.CylinderGeometry(10, 10, bondLength, 32);
const bondMaterial = new THREE.MeshStandardMaterial({
    color: THREE.Color.NAMES.white,
});

const bond1 = new THREE.Mesh(bondGeometry, bondMaterial);
const bond2 = new THREE.Mesh(bondGeometry, bondMaterial);
const bond3 = new THREE.Mesh(bondGeometry, bondMaterial);
const bond4 = new THREE.Mesh(bondGeometry, bondMaterial);

const spriteScale = [100, 100, 1] as [number, number, number];
const crLabel = createTextSprite("C", { scale: [200, 200, 1] });
const h1Label = createTextSprite("H1", { scale: spriteScale });
const h2Label = createTextSprite("H2", { scale: spriteScale });
const h3Label = createTextSprite("H3", { scale: spriteScale });
const h4Label = createTextSprite("H4", { scale: spriteScale });

// simplify variable name
const bl = bondLength;

// prettier-ignore
const atomPositions = {
    carbon: [bl *  0,       bl * 1.25,     bl *  0],
    h1:     [bl *  1.125,   bl * 1,        bl *  0],
    h2:     [bl * -1.125,   bl * 1,        bl *  0],
    h3:     [bl *  0,       bl * 1,        bl *  1],
    h4:     [bl *  0,       bl * 1.625,    bl * -1],
} as const;

// prettier-ignore
const bondPositions = {
    bond1:  [bl *  0.625,   bl * 1.125,    bl *  0],
    bond2:  [bl * -0.625,   bl * 1.125,    bl *  0],
    bond3:  [bl *  0,       bl * 1.25,     bl *  0.5],
    bond4:  [bl *  0,       bl * 1.25,     bl * -0.5],
} as const;

carbon___Atom.position.set(...atomPositions.carbon);
hydrogenAtom1.position.set(...atomPositions.h1);
hydrogenAtom2.position.set(...atomPositions.h2);
hydrogenAtom3.position.set(...atomPositions.h3);
hydrogenAtom4.position.set(...atomPositions.h4);

crLabel.position.set(...atomPositions.carbon);
h1Label.position.set(...atomPositions.h1);
h2Label.position.set(...atomPositions.h2);
h3Label.position.set(...atomPositions.h3);
h4Label.position.set(...atomPositions.h4);

bond1.position.set(...bondPositions.bond1);
bond2.position.set(...bondPositions.bond2);
bond3.position.set(...bondPositions.bond3);
bond4.position.set(...bondPositions.bond4);

const planeGeometry = new THREE.PlaneGeometry(100 * 1000, 100 * 1000);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: THREE.Color.NAMES.black,
    side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 1.999;
plane.position.y = -bondLength * 1.7;

const moleculeGroup = new THREE.Group();
moleculeGroup.add(
    carbon___Atom,
    hydrogenAtom1,
    hydrogenAtom2,
    hydrogenAtom3,
    hydrogenAtom4,
    bond1,
    bond2,
    bond3,
    bond4,
    crLabel,
    h1Label,
    h2Label,
    h3Label,
    h4Label,
);

const labels = [crLabel, h1Label, h2Label, h3Label, h4Label];
const materials = [
    carbonAtomMaterial,
    hydrogenAtomMaterial,
    bondMaterial,
    planeMaterial,
];

scene.add(moleculeGroup, plane);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

directionalLight.color = new THREE.Color(THREE.Color.NAMES.green); // set a yellow color
const top = canvas.height / 2;
const left = -canvas.width / 2;
directionalLight.position.set(left * 1.5, top * 2, -100); // set the position of the light to the top left corner
directionalLight.visible = true; // ensure the light is visible
directionalLight.intensity = 100;
directionalLight.castShadow = true; // enable shadow casting from this light
plane.receiveShadow = true;
plane.castShadow = false; // disable shadow casting

carbon___Atom.castShadow = true;
hydrogenAtom1.castShadow = true;
hydrogenAtom2.castShadow = true;
hydrogenAtom3.castShadow = true;
hydrogenAtom4.castShadow = true;
bond1.castShadow = true;
bond2.castShadow = true;
bond3.castShadow = true;
bond4.castShadow = true;

carbon___Atom.receiveShadow = false;
hydrogenAtom1.receiveShadow = false;
hydrogenAtom2.receiveShadow = false;
hydrogenAtom3.receiveShadow = false;
hydrogenAtom4.receiveShadow = false;
bond1.receiveShadow = false;
bond2.receiveShadow = false;
bond3.receiveShadow = false;
bond4.receiveShadow = false;

directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 5000;
directionalLight.shadow.camera.left = -1000;
directionalLight.shadow.camera.right = 1000;
directionalLight.shadow.camera.top = 1000;
directionalLight.shadow.camera.bottom = -1000;

camera.position.set(300, 1000, 200);
camera.lookAt(carbon___Atom.position);

// orientation of the bond cylinder
// the cylinders perpendicular to the sphere's surface and at the center of them
const reOrientBond = (params: {
    bond: THREE.Mesh;
    carbon: THREE.Mesh;
    hydrogen: THREE.Mesh;
}) => {
    const { bond, carbon, hydrogen } = params;
    const carbonPosition = carbon.position;
    const hydrogenPosition = hydrogen.position;

    const direction = new THREE.Vector3()
        .subVectors(hydrogenPosition, carbonPosition)
        .normalize();

    const distanceCH = carbonPosition.distanceTo(hydrogenPosition);
    const bondAdjustedLength = distanceCH - (carbonRadius + hydrogenRadius);

    // Position the bond: start at carbon surface, move half the bond length along direction
    const bondCenterOffset = carbonRadius + bondAdjustedLength / 2;
    bond.position
        .copy(carbonPosition)
        .add(direction.clone().multiplyScalar(bondCenterOffset));

    bond.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
};

reOrientBond({ bond: bond1, carbon: carbon___Atom, hydrogen: hydrogenAtom1 });
reOrientBond({ bond: bond2, carbon: carbon___Atom, hydrogen: hydrogenAtom2 });
reOrientBond({ bond: bond3, carbon: carbon___Atom, hydrogen: hydrogenAtom3 });
reOrientBond({ bond: bond4, carbon: carbon___Atom, hydrogen: hydrogenAtom4 });

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

const rotateMolecule = () => {
    if (shouldRotate) {
        moleculeGroup.rotation[rotationAxis as "x" | "y" | "z"] +=
            rotationSpeed * rotationDirection;
    }
};

const resetCubeRotation = () => {
    shouldRotate = false;
    rotateCheckbox.checked = false;
    moleculeGroup.rotation.set(0, 0, 0);
};

const resetRotationButton = document.getElementById(
    "resetRotation",
) as HTMLButtonElement;
resetRotationButton.addEventListener("click", resetCubeRotation);

const animate = () => {
    requestAnimationFrame(animate);

    rotateMolecule();

    labels.forEach((label) => {
        label.visible = shouldShowLabels();
    });

    materials.forEach((material) => {
        material.wireframe = shouldShowWireframe();
    });

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
        "Reset Rotation: Stop the rotation and reset the shape's rotation to the last state before rotation started.",
    ],
});
