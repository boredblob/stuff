import {setTheme} from "./theme.mjs";
import {loadWidget} from "./widget.mjs";
import {loadPlayer} from "./player.mjs";
import {secondsToTime} from "./timeStuff.mjs";
import {loadButtons, updateTime} from "./buttons.mjs";
import {time} from "./elements.mjs";
import {loadSlider} from "./slider.mjs";
import {resetTimePromise, timePromiseValue} from "./timePromiseThings.mjs";
import {loadSongInfo} from "./songInfo.mjs";

setTheme("background2.jpg");

async function init() {
  const widget = await loadWidget();
  const player = await loadPlayer(widget);

  time.duration.innerHTML = secondsToTime(player.sound.duration);

  resetTimePromise(widget);

  function update() {
    if (timePromiseValue !== null) {
      player.currentTime = timePromiseValue;
      updateTime(player);

      resetTimePromise(widget);
    }    
  
    if (player.playing) {requestAnimationFrame(update);}
  }

  loadSongInfo(player);
  loadButtons(widget, player, update);
  loadSlider(widget, player, update);
}

window.onload = init;