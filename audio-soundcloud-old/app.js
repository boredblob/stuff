const img = document.querySelector(".invis");
const [primaryH, primaryS, primaryL] = rgbToHsl(...getAverageColour(img));
img.remove();

document.body.style.setProperty("--primary-hue", primaryH);
document.body.style.setProperty("--primary-saturation", primaryS + "%");
document.body.style.setProperty("--primary-lightness", primaryL + "%");


function init() {
  const buttons = document.querySelector(".buttons");

  const playpause = buttons.querySelector(".playpause");
  const rewind = buttons.querySelector(".rewind");
  const fast_forward = buttons.querySelector(".fast-forward");
  const skip_forward = buttons.querySelector(".skip-forward");
  const skip_back = buttons.querySelector(".skip-back");

  playpause.onclick = () => {
    if (player.playing) {
      player.pause();
      playpause.innerHTML = svgs.play;
    } else {
      player.play();
      playpause.innerHTML = svgs.pause;
    }
  };
  
  rewind.onclick = () => {
    widget.seekTo(player.currentTime -= 10000);
    elapsed.innerHTML = secondsToTime(player.currentTime);
    bar.style.width = (player.currentTime / player.sound.duration) * 100 + "%";
  };
  fast_forward.onclick = () => {    
    widget.seekTo(player.currentTime += 10000);
    elapsed.innerHTML = secondsToTime(player.currentTime);
    bar.style.width = (player.currentTime / player.sound.duration) * 100 + "%";
  };

  skip_forward.onclick = () => {
    widget.next();
  };

  skip_back.onclick = () => {
    widget.prev();
  };
}

function update() {
  getCurrentTime().then(time=>{player.currentTime = time;});

  elapsed.innerHTML = secondsToTime(player.currentTime);
  
  bar.style.width = (player.currentTime / player.sound.duration) * 100 + "%";

  if (player.playing) {requestAnimationFrame(update);}
}

window.onload = init;