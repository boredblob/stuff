import {setTheme} from "./theme.mjs";
import {loadPlayer} from "./player.mjs";
import {secondsToTime} from "./timeStuff.mjs";
import {loadButtons, updateTime} from "./buttons.mjs";
import {time, info} from "./elements.mjs";
import {loadSlider} from "./slider.mjs";
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
  const songs = await fetch("./src/list.json").then(response => response.json());
  const player = await loadPlayer(songs);
  player.srcElement.src = player.song.src;
  
  function update() {
    updateTime(player);
    if (player.playing) {requestAnimationFrame(update);}
  }

  loadButtons(player, update);
  loadSlider(player, update);

  player.srcElement.addEventListener("loadedmetadata", async () => {
    loadSongInfo(player);
    const url = getBackgroundImageURL();
    await setTheme(url);
    loadMediaData(player, url);
  });
  player.srcElement.addEventListener("play", () => {player.play(); requestAnimationFrame(update);});

  requestAnimationFrame(update);
}

function loadSongInfo(player) {
  time.duration.innerHTML = secondsToTime(player.srcElement.duration || 0);
  info.title.innerHTML = player.song.title;
  info.artist.innerHTML = player.song.artist;
}

function getBackgroundImageURL() {
  return "https://source.unsplash.com/collection/437035?caching-prevention=" + Math.floor(Math.random() * 100000);
}

window.onload = init;