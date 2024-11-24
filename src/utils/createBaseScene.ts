import * as THREE from "three";

type CreateBaseSceneParams = {
    canvasId?: string;
    sceneTitle: string;
    cameraZ?: number;
};

const defaultParams: CreateBaseSceneParams = {
    canvasId: "glcanvas",
    sceneTitle: "Base Scene",
    cameraZ: 200,
};

export const createBaseScene = (
    params: CreateBaseSceneParams = defaultParams,
) => {
    const { canvasId, cameraZ, sceneTitle } =
        params as Required<CreateBaseSceneParams>;
    const mainDiv = document.createElement("div");
    mainDiv.classList.add(
        "flex",
        "h-full",
        "w-full",
    );
    document.body.appendChild(mainDiv);
    const canvas = document.createElement("canvas");
    canvas.id = canvasId;
    canvas.classList.add("glcanvas", "md:w-[80%]");
    mainDiv.appendChild(canvas);

    if (!(canvas instanceof HTMLCanvasElement)) {
        throw new Error("Canvas not found");
    }

    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const h = windowHeight;
    const w = windowWidth * 0.8;
    canvas.width = w;
    canvas.height = h;
    const canvasAspect = canvas.width / canvas.height;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, canvasAspect, 0.1, 1000);
    camera.position.z = cameraZ;

    scene.add(new THREE.DirectionalLight(0xffffff, 0.5)); // dim light shining from above
    var viewpointLight = new THREE.DirectionalLight(0xffffff, 1); // a light to shine in the direction the camera faces
    viewpointLight.position.set(0, 0, 1); // shines down the z-axis
    scene.add(viewpointLight);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(w, h);

    // right sidebar, for config and info
    const sidebar = document.createElement("div");
    sidebar.classList.add(
        "md:w-[20%]",
        "h-window",
        "bg-gray-200",
        "overflow-auto",
        "p-4",
    );
    mainDiv.appendChild(sidebar);

    const title = document.createElement("h1");
    title.innerText = sceneTitle;

    title.classList.add("text-2xl", "font-bold", "mb-4", "text-center");

    sidebar.appendChild(title);

    return {
        canvas,
        scene,
        camera,
        renderer,
        render: () => {
            renderer.render(scene, camera);
        },
    };
};
