import {overlay} from "./elements.mjs";
import {svgs, buttons} from "./elements.mjs";
import {setMediaSessionState} from "./mediaData.mjs";

export async function loadPlayer(widget) {
  function getCurrentSound() {
    return new Promise(resolve => {
      widget.getCurrentSound(s=>{resolve(s);});
    });
  }

  function getSounds() {
    return new Promise(resolve => {
      widget.getSounds(s=>{resolve(s);});
    });
  }

  function getSoundIndex() {
    return new Promise(resolve => {
      widget.getCurrentSoundIndex(s=>{resolve(s);});
    });
  }

  const player = {
    sound: await getCurrentSound(),
    sounds: await getSounds(),
    soundIndex: await getSoundIndex(),
    playing: false,
    currentTime: 0,
    willResume: false,
    volume: 100,
    play: () => {
      player.playing = true;
      overlay.style.opacity = 0.2;
      buttons.playpause.innerHTML = svgs.pause;
      setMediaSessionState("playing");
      widget.play();
    },
    pause: () => {
      player.playing = false;
      overlay.style.opacity = 0.6;
      buttons.playpause.innerHTML = svgs.play;
      setMediaSessionState("paused");
      widget.pause();
    }
  };
  return player;
}