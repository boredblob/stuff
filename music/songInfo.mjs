import {info, artist, title} from "./elements.mjs";

export async function loadSongInfo(player, link) {
  changeLink(artist, player.sound.user.permalink_url, player.sound.user.username);
  changeLink(title, player.sound.permalink_url, player.sound.title);
  if (link.includes("playlist")) {
    const nextUp = document.createElement("span");
    nextUp.className = "next-up";
    nextUp.innerHTML = player.sounds;
  }
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