import {artist, title} from "./elements.mjs";

export function loadSongInfo(player) {
  changeLink(artist, player.sound.user.permalink_url, player.sound.user.username);
  changeLink(title, player.sound.permalink_url, player.sound.title);
}

function changeLink(parent, url, text) {
  for (const child of parent.childNodes) {
    child.remove();
  }

  const link = document.createElement("a");
  link.href = url;
  link.innerHTML = text;
  parent.appendChild(link);
}