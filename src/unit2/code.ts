import * as THREE from "three";
import { createBaseScene } from "../utils/createBaseScene";
import { createTextSprite } from "../utils/createTextSprite";

const { scene, render, addHelpNote, shouldShowWireframe, shouldShowLabels } =
    createBaseScene({
        sceneTitle: "Unit 2: Polygon with 5 vertices",
        cameraZ: 20,
    });

const geometry = new THREE.BufferGeometry();
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
geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
geometry.setIndex(indices);
geometry.computeVertexNormals();
// geometry.computeBoundingSphere();

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

const mesh = new THREE.Mesh(geometry, materials);
scene.add(mesh);

const numVertices = vertices.length / 3;

const labels: THREE.Sprite<THREE.Object3DEventMap>[] = [];

for (let i = 0; i < numVertices; i++) {
    const x = vertices[i * 3] || 0;
    const y = vertices[i * 3 + 1] || 0;
    const z = vertices[i * 3 + 2] || 0;

    const label = createTextSprite(`V${i}`);
    label.position.set(x, y, z);
    label.visible = false;

    mesh.add(label);
    labels.push(label);
}

const animate = () => {
    materials.forEach((material) => {
        const isWireframe = shouldShowWireframe();
        material.wireframe = isWireframe;
    });

    labels.forEach((label) => {
        label.visible = shouldShowLabels();
    });

    requestAnimationFrame(animate);
    mesh.rotation.y += 0.01;
    render();
};

animate();

addHelpNote({
    title: "Unit 2: Polygon with 5 vertices",
    description: "This is a polygon with 5 vertices. It is a pentagon.",
    points: [
        "The vertices are at the top, top-right, bottom-right, bottom-left, and top-left.",
        "The sides are red and the polygon is rotating.",
    ],
});
