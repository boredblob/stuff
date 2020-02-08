import {setTheme} from "./theme.mjs";
import {loadWidget} from "./widget.mjs";
import {loadPlayer} from "./player.mjs";
import {secondsToTime} from "./timeStuff.mjs";
import {loadButtons, updateTime, refreshInfo} from "./buttons.mjs";
import {time} from "./elements.mjs";
import {loadSlider} from "./slider.mjs";
import {resetTimePromise, timePromiseValue} from "./timePromiseThings.mjs";
import {loadSongInfo} from "./songInfo.mjs";
import {loadMediaData} from "./mediaData.mjs";


const queries = new URL(window.location.href).searchParams;
const playlist = queries.get("p");
const track = queries.get("t");
let link = "playlists/958052449";
if (track) {
  link = "tracks/" + track;
}
if (playlist) {
  link = "playlists/" + playlist;
}


async function init() {
  const widget = await loadWidget(link, 0);

  document.addEventListener("refreshinfo", () => {
    start(widget);
  });
  
  start(widget);
}

async function start(widget) {
  const player = await loadPlayer(widget);

  const url = "https://source.unsplash.com/collection/3178572?caching-prevention=" + Math.floor(Math.random() * 100000);
  setTheme(url);
  console.log(player.sound);
  
  time.duration.innerHTML = secondsToTime(player.sound.duration);
  
  resetTimePromise(widget);

  await loadMediaData(player);
  
  function update() {
    if (timePromiseValue !== null) {
      player.currentTime = timePromiseValue;
      updateTime(player);
      
      resetTimePromise(widget);
    }    
    
    if (player.playing) {requestAnimationFrame(update);}
  }

  widget.bind(SC.Widget.Events.FINISH, () => {
    widget.next();
    refreshInfo(player);
  });
  
  loadSongInfo(player, link);
  loadButtons(widget, player, update);
  loadSlider(widget, player, update);

  player.play();
  requestAnimationFrame(update);
}

window.onload = init;