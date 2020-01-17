const img = document.querySelector(".invis");
const [primaryH, primaryS, primaryL] = rgbToHsl(...getAverageColour(img));
img.remove();

document.body.style.setProperty("--primary-hue", primaryH);
document.body.style.setProperty("--primary-saturation", primaryS + "%");
document.body.style.setProperty("--primary-lightness", primaryL + "%");

const player = {
  playing: false,
  trackLength: 0,
  play: () => {
    player.playing = true;
    overlay.style.opacity = 0.2;
    player.audio.play();
    requestAnimationFrame(update);
  },
  pause: () => {
    player.playing = false;
    overlay.style.opacity = 0.6;
    player.audio.pause();
  },
  willResume: false
};

const timeDisplay = document.querySelector(".controls .time");
const elapsed = timeDisplay.querySelector(".elapsed");
const duration = timeDisplay.querySelector(".duration");

function init() {
  const audio = document.createElement("audio");
  const source = document.createElement("source");

  audio.setAttribute("preload", "metadata");

  fetch("./bitter-sweet-love.mp3", {method: "GET"})
    .then(response=>response.blob())
    .then(blob => {
      source.src = URL.createObjectURL(blob);
      audio.load();
    })
    .catch(err => {console.warn("Error while getting audio file: ", err)});

  audio.appendChild(source);
  document.body.appendChild(audio);

  player.audio = audio;

  audio.onloadedmetadata = () => {
    duration.innerHTML = secondsToTime(player.audio.duration);
    const buttons = document.querySelector(".buttons");
  
    const playpause = buttons.querySelector(".playpause");
    const rewind = buttons.querySelector(".rewind");
    const fast_forward = buttons.querySelector(".fast-forward");
  
    playpause.onclick = () => {
      if (player.playing) {
        player.pause();
        playpause.innerHTML = svgs.play;
      } else {
        player.play();
        playpause.innerHTML = svgs.pause;
      }
    };
    
    rewind.onclick = () => {player.audio.currentTime -= 10;};
    fast_forward.onclick = () => {player.audio.currentTime += 10;};
  };
}

function update() {
  elapsed.innerHTML = secondsToTime(player.audio.currentTime);

  bar.style.width = (player.audio.currentTime / player.audio.duration) * 100 + "%";

  if (player.playing) {requestAnimationFrame(update);}
}

function secondsToTime(seconds = 0) {
  let time = new Date(Math.floor(seconds * 1000)).toISOString().substr(11, 8);
  if (time.charAt(0) == 0 && time.charAt(1) == 0) {
    time = time.slice(-5);
  }
  if (time.charAt(0) == 0) {
    time = time.slice(-4);
  }
  return time;
}

window.onload = init;