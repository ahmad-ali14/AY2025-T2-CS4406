import * as THREE from "three";
import { createBaseScene } from "../utils/createBaseScene";
import { createTextSprite } from "../utils/createTextSprite";

const { render, scene, directionalLight, renderer, canvas, camera } =
    createBaseScene({
        sceneTitle: "Unit 5: Methane Molecule",
        cameraZ: window.innerHeight,
        cameraFov: 75,
        defaultLightColor: "#ffffff",
        showAxes: false,
        showGrid: false,
    });

const carbonAtomGeometry = new THREE.SphereGeometry(80, 32, 32);
const carbonAtomMaterial = new THREE.MeshStandardMaterial({ color: "red" });
const carbonAtom = new THREE.Mesh(carbonAtomGeometry, carbonAtomMaterial);

const hydrogenAtomGeometry = new THREE.SphereGeometry(30, 32, 32);
const hydrogenAtomMaterial = new THREE.MeshStandardMaterial({ color: "blue" });

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

const bl = 200;
const bondGeometry = new THREE.CylinderGeometry(10, 10, 200, 32);
const bondMaterial = new THREE.MeshStandardMaterial({ color: "white" });

const bond1 = new THREE.Mesh(bondGeometry, bondMaterial);
const bond2 = new THREE.Mesh(bondGeometry, bondMaterial);
const bond3 = new THREE.Mesh(bondGeometry, bondMaterial);
const bond4 = new THREE.Mesh(bondGeometry, bondMaterial);

const spriteScale = [100, 100, 1] as [number, number, number];
const carbonLabel = createTextSprite("C", { scale: spriteScale });
const h1Label = createTextSprite("H1", { scale: spriteScale });
const h2Label = createTextSprite("H2", { scale: spriteScale });
const h3Label = createTextSprite("H3", { scale: spriteScale });
const h4Label = createTextSprite("H4", { scale: spriteScale });

carbonAtom.position.set(0, 250, 0);
carbonLabel.position.set(0, 250, 0);

hydrogenAtom1.position.set(225, 150, 0);
h1Label.position.set(225, 150, 0);

hydrogenAtom2.position.set(-225, 150, 0);
h2Label.position.set(-225, 150, 0);

hydrogenAtom3.position.set(0, 200, 150);
h3Label.position.set(0, 200, 150);

hydrogenAtom4.position.set(0, 325, -175);
h4Label.position.set(0, 325, -175);

bond1.position.set(125, 225, 0);
bond1.rotation.z = Math.PI / 3.55;

bond2.position.set(-125, 225, 0);
bond2.rotation.z = Math.PI / -3.55;

bond3.position.set(0, 250, 50);
bond3.rotation.x = Math.PI / -3;

bond4.position.set(0, 250, -100);
bond4.rotation.x = Math.PI / -3.55;

const planeGeometry = new THREE.PlaneGeometry(100 * 1000, 100 * 1000);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: THREE.Color.NAMES.black,
    side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = Math.PI / 1.999;
plane.position.y = 0;

scene.add(
    carbonAtom,
    hydrogenAtom1,
    hydrogenAtom2,
    hydrogenAtom3,
    hydrogenAtom4,
    bond1,
    bond2,
    bond3,
    bond4,
    carbonLabel,
    h1Label,
    h2Label,
    h3Label,
    h4Label,
    plane,
);

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

carbonAtom.castShadow = true;
hydrogenAtom1.castShadow = true;
hydrogenAtom2.castShadow = true;
hydrogenAtom3.castShadow = true;
hydrogenAtom4.castShadow = true;
bond1.castShadow = true;
bond2.castShadow = true;
bond3.castShadow = true;
bond4.castShadow = true;

carbonAtom.receiveShadow = false;
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

camera.position.set(500, 500, 500);
camera.lookAt(new THREE.Vector3(0, 0, 0));

const animate = () => {
    requestAnimationFrame(animate);
    render();
};

animate();
