function getAverageColour(img) {
  const samples = 128; //low sample number for speed (256 is good for accuracy)
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