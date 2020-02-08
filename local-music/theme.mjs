import { rgbToHsl } from "./colourManipulation.mjs";

/**
 * Returns the average colour in an image element
 *
 * @param   {HTMLImageElement}  img     The image element to get the colour from
 * @param   {number}            samples The number of samples to take from the image
 * @return  {Array}                     The RGB representation of the colour
 */
function getAverageColour(img, samples = 256) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.height = img.naturalHeight || img.offsetHeight || img.height;
  canvas.width = img.naturalWidth || img.offsetWidth || img.width;

  ctx.drawImage(img, 0, 0);

  const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data;

  const blockSize = Math.floor(data.length / (samples * 4));

  let r = 0, g = 0, b = 0, a = 0;
  for (let i = 0; i < data.length; i+= blockSize*4) {
    r += data[i];
    g += data[i+1];
    b += data[i+2];
  }

  r = Math.floor(r/samples);
  g = Math.floor(g/samples);
  b = Math.floor(b/samples);

  if (!r && !g && !b) {
    return [255, 255, 255];
  }

  return [r, g, b];
}

function getImage(src = "") {
  return new Promise(resolve => {
    const img = document.createElement("img");
    img.crossOrigin = "Anonymous";
    img.src = src;
    img.onload = () => {
      resolve(img);
    };
  });
}

/**
 * Sets the theme of the site based on an image
 * @param imageSource The source of the image
 */
export async function setTheme(imageSource = "") {
  const img = await getImage(imageSource);

  const [primaryH, primaryS, primaryL] = rgbToHsl(...getAverageColour(img));

  document.body.style.setProperty("--primary-hue", primaryH);
  document.body.style.setProperty("--primary-saturation", primaryS + "%");
  document.body.style.setProperty("--primary-lightness", primaryL + "%");

  document.body.style.background= "url('" + imageSource + "') no-repeat"
  document.body.style.backgroundSize = "cover";
}