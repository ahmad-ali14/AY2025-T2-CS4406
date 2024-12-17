import * as THREE from "three";
import { createBaseScene } from "../utils/createBaseScene";
import { createTextSprite } from "../utils/createTextSprite";

const { render, scene } = createBaseScene({
    sceneTitle: "Unit 5: Methane Molecule",
    cameraZ: window.innerHeight,
    defaultLightColor: "#ffffff",
    showAxes: true,
    showGrid: false,
});

const carbonAtomGeometry = new THREE.SphereGeometry(50, 32, 32);
const carbonAtomMaterial = new THREE.MeshBasicMaterial({ color: "red" });
const carbonAtom = new THREE.Mesh(carbonAtomGeometry, carbonAtomMaterial);

const hydrogenAtomGeometry = new THREE.SphereGeometry(30, 32, 32);
const hydrogenAtomMaterial = new THREE.MeshBasicMaterial({ color: "blue" });

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

const bondGeometry = new THREE.CylinderGeometry(10, 10, 100, 32);
const bondMaterial = new THREE.MeshBasicMaterial({ color: "white" });

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

hydrogenAtom1.position.set(100, 250, 0);
h1Label.position.set(100, 250, 0);

hydrogenAtom2.position.set(-100, 250, 0);
h2Label.position.set(-100, 250, 0);

hydrogenAtom3.position.set(0, 250, 100);
h3Label.position.set(0, 250, 100);

hydrogenAtom4.position.set(0, 250, -100);
h4Label.position.set(0, 250, -100);

bond1.position.set(50, 250, 0);
bond1.rotation.z = Math.PI / 2;

bond2.position.set(-50, 250, 0);
bond2.rotation.z = Math.PI / 2;

bond3.position.set(0, 250, 50);
bond3.rotation.x = Math.PI / 2;

bond4.position.set(0, 250, -50);
bond4.rotation.x = Math.PI / 2;

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
);


const animate = () => {
    requestAnimationFrame(animate);
    render();
};

animate();
