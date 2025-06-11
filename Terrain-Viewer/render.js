import { terrainColorSchemes } from './terrainSettings.js';

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const schemeSelect = document.getElementById("schemeSelect");

let currentMapData = null;
let currentSchemeName = schemeSelect.value;

function getTerrainColor(byte) {
  return terrainColorSchemes[currentSchemeName](byte);
}

function drawTerrain({ width, height, data }) {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const imageData = ctx.createImageData(width, height);
  for (let i = 0; i < data.length; i++) {
    const color = getTerrainColor(data[i]);
    const offset = i * 4;
    imageData.data[offset + 0] = color.r;
    imageData.data[offset + 1] = color.g;
    imageData.data[offset + 2] = color.b;
    imageData.data[offset + 3] = color.a;
  }
  ctx.putImageData(imageData, 0, 0);
}

async function loadBinTerrain(url) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  const width = bytes[0] | (bytes[1] << 8);
  const height = bytes[2] | (bytes[3] << 8);
  const data = bytes.slice(4);

  if (data.length !== width * height) {
    throw new Error("Wrong .bin dimensions");
  }

  return { width, height, data };
}

// 🔁 Initial load
loadBinTerrain("Maps/Europe.bin")
  .then((mapData) => {
    currentMapData = mapData;
    drawTerrain(mapData);
  })
  .catch((err) => console.error("Failed to load terrain:", err));

// 🔄 Handle dropdown change
schemeSelect.addEventListener("change", () => {
  currentSchemeName = schemeSelect.value;
  if (currentMapData) {
    drawTerrain(currentMapData);
  }
});
