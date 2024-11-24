import { defineConfig } from "vite";
import { resolve } from "path";
import { readdirSync } from "fs";

/**
 * @type {string[]}
 *
 */
//@ts-ignore
const allSrcHtmlFiles = readdirSync(resolve(__dirname, "src"), {
  recursive: true,
})
  .filter((file) => {
    return typeof file === "string" && file.endsWith(".html");
  })
  .map((file) => {
    // @ts-ignore
    return resolve(__dirname, "src", file);
  });

console.log(allSrcHtmlFiles);

export default defineConfig({
  build: {
    outDir: "../site", // Output folder for built files
    sourcemap: true, // Enable sourcemaps
    rollupOptions: {
      input: allSrcHtmlFiles,
    },
  },
  base: "./",
  root: "src",
  // publicDir: "src",
});
