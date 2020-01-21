import {overlay} from "./elements.mjs";

export async function loadPlayer(widget) {
  function getCurrentSound(widget) {
    return new Promise(resolve => {
      widget.getCurrentSound(s=>{resolve(s);});
    });
  }

  const player = {
    sound: await getCurrentSound(widget),
    playing: false,
    currentTime: 0,
    willResume: false,
    play: () => {
      player.playing = true;
      overlay.style.opacity = 0.2;
      widget.play();
    },
    pause: () => {
      player.playing = false;
      overlay.style.opacity = 0.6;
      widget.pause();
    }
  };
  return player;
}