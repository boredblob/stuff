import {overlay} from "./elements.mjs";
import {svgs, buttons} from "./elements.mjs";
import {setMediaSessionState} from "./mediaData.mjs";

export async function loadPlayer(songs) {
  const player = {
    song: songs[0],
    songs: songs,
    willResume: false,
    volume: 100,
    play: () => {
      player.playing = true;
      overlay.style.opacity = 0.2;
      buttons.playpause.innerHTML = svgs.pause;
      setMediaSessionState("playing");
      player.srcElement.play();
    },
    pause: () => {
      player.playing = false;
      overlay.style.opacity = 0.6;
      buttons.playpause.innerHTML = svgs.play;
      setMediaSessionState("paused");
      player.srcElement.pause();
    },
    srcElement: document.querySelector("audio")
  };

  let soundIndex = 0;
  Object.defineProperty(player, "soundIndex", {
    get: () => {
      return soundIndex;
    },
    set: (x) => {
      soundIndex = x;
      player.song = player.songs[x];
    }
  });

  return player;
}