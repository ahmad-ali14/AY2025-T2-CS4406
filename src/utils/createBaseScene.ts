import * as THREE from "three";

export const createBaseScene = (canvasId = "glcanvas") => {
    const canvas = document.getElementById(canvasId);

    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error("Canvas not found");
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const canvasAspect = canvas.width / canvas.height;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, canvasAspect, 0.1, 1000);
    camera.position.z = 200;

    scene.add(new THREE.DirectionalLight(0xffffff, 0.5)); // dim light shining from above
    var viewpointLight = new THREE.DirectionalLight(0xffffff, 1); // a light to shine in the direction the camera faces
    viewpointLight.position.set(0, 0, 1); // shines down the z-axis
    scene.add(viewpointLight);

    const renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    return {
        scene,
        camera,
        renderer,
        render: () => {
            renderer.render(scene, camera);
        },
    };
};
