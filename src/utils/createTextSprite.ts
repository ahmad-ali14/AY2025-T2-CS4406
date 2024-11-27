import * as THREE from "three";

export const createTextSprite = (message: string | number) => {
    const canvas = document.createElement("canvas");
    const size = 256; 
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext("2d");

    if (!context) {
        throw new Error("2D context not supported");
    }

    // Set font properties
    context.font = "Bold 48px Arial";
    context.fillStyle = "rgba(255, 255, 255, 1.0)";
    context.textAlign = "center";
    context.textBaseline = "middle";

    // Draw the text
    context.fillText(message.toString(), size / 2, size / 2);

    // Create texture and sprite material
    const texture = new THREE.CanvasTexture(canvas);
    const spriteMaterial = new THREE.SpriteMaterial({
        map: texture,
        depthTest: false, // Ensures the label is always visible
    });

    // Create the sprite
    const sprite = new THREE.Sprite(spriteMaterial);

    // Scale the sprite appropriately
    sprite.scale.set(2, 2, 1); // Adjust the scale as needed
    return sprite;
};
