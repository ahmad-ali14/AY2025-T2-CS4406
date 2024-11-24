import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

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
    mainDiv.classList.add("flex", "h-full", "w-full");
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
    const shouldShowSidebar = true;

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

    shouldShowSidebar && sidebar.appendChild(title);

    const shouldShowHelpers = true;
    const shouldUseOrbitControls = true;

    // Add a grid to the scene
    const gridHelper = new THREE.GridHelper(1000, 1000);
    gridHelper.position.set(0, 0, 0);
    gridHelper.material.opacity = 0.25;
    gridHelper.visible = shouldShowHelpers;
    scene.add(gridHelper);

    // Add an axis to the scene
    const axesHelper = new THREE.AxesHelper(1000);
    axesHelper.position.set(0, 0, 0);
    axesHelper.visible = shouldShowHelpers;
    axesHelper.setColors(0x0000ff, 0x00ff00, 0xff0000);
    scene.add(axesHelper);

    // add camera controls
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.enablePan = true;
    controls.enableRotate = true;
    controls.autoRotate = false;
    controls.enabled = shouldUseOrbitControls;

    const controlOptionsDiv = document.createElement("div");
    controlOptionsDiv.classList.add("mb-4");

    controlOptionsDiv.innerHTML = `
    <hr class="border border-b-[#000] mb-2" />
    <h2 class="text-xl font-bold text-center mb-2">Controls Options</h2>
    <div class="flex flex-col space-y-2 text-lg">
      <div>
        <input type="checkbox" id="showGrid" checked>
      <label for="showGrid" class="font-bold">Show Grid</label>
      </div>
      <div>
        <input type="checkbox" id="showAxes" checked>
        <label for="showAxes" class="font-bold">Show Axes</label>
      </div>
      <div>
        <input type="checkbox" id="useOrbitControls" checked>
        <label for="useOrbitControls" class="font-bold">Use Orbit Controls</label>
      </div>
    </div>  
    `;
    sidebar.appendChild(controlOptionsDiv);

    const showGrid = document.getElementById("showGrid") as HTMLInputElement;
    const showAxes = document.getElementById("showAxes") as HTMLInputElement;
    const useOrbitControls = document.getElementById(
        "useOrbitControls",
    ) as HTMLInputElement;

    showGrid.checked = shouldShowHelpers;
    showAxes.checked = shouldShowHelpers;
    useOrbitControls.checked = shouldUseOrbitControls;

    showGrid.addEventListener("change", () => {
        gridHelper.visible = showGrid.checked;
    });

    showAxes.addEventListener("change", () => {
        axesHelper.visible = showAxes.checked;
    });

    useOrbitControls.addEventListener("change", () => {
        controls.enabled = useOrbitControls.checked;
    });

    const helpDiv = document.createElement("div");
    helpDiv.classList.add("text-center");
    helpDiv.innerHTML = `<div>
    <button class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full">
       ? Help
    </button>
    </div>`;
    helpDiv.addEventListener("click", () => {
        //TODO: open help modal
    });
    sidebar.appendChild(helpDiv);
    helpDiv.classList.add("absolute", "bottom-1", "w-72", "text-center");

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
