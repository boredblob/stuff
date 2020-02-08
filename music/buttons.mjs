import {buttons, time, bar} from "./elements.mjs";
import {secondsToTime} from "./timeStuff.mjs";
import {canUseMediaSession} from "./mediaData.mjs";

export function loadButtons(widget, player, updateFunction) {
  function playpause() {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
      requestAnimationFrame(updateFunction);
    }
  }

  function rewind() {
    const newTime = Math.max(Math.min(player.currentTime - 10000 , player.sound.duration), 0);
    widget.seekTo(player.currentTime = newTime);
    updateTime(player);
  }

  function fast_forward() {
    const newTime = Math.max(Math.min(player.currentTime + 10000 , player.sound.duration), 0);
    widget.seekTo(player.currentTime = newTime);
    updateTime(player);
  }

  function skip_back() {
    if (player.soundIndex > 0) {
      widget.prev();
      refreshInfo(player);
    } else {
      widget.seekTo(0);
    }
  }

  function skip_forward() {
    widget.next();
    refreshInfo(player);
  }

  buttons.playpause.onclick = playpause;
  buttons.rewind.onclick = rewind;
  buttons.fast_forward.onclick = fast_forward;
  buttons.skip_back.onclick = skip_back;
  buttons.skip_forward.onclick = skip_forward;

  document.onkeydown = e => {
    switch (e.code) {
      case "Space":
        playpause();
        break;
      case "ArrowLeft":
        rewind();
        break;
      case "ArrowRight":
        fast_forward();
        break;
      case "ArrowUp":
        widget.setVolume(player.volume += 10);
      case "ArrowDown":
        widget.setVolume(player.volume -= 10);
      default:
        break;
    }
  }

  if (canUseMediaSession) {
    navigator.mediaSession.setActionHandler('play', playpause);
    navigator.mediaSession.setActionHandler('pause', playpause);
    navigator.mediaSession.setActionHandler('seekbackward', rewind);
    navigator.mediaSession.setActionHandler('seekforward', fast_forward);
    navigator.mediaSession.setActionHandler('previoustrack', skip_back);
    navigator.mediaSession.setActionHandler('nexttrack', skip_forward);
  }
}

export function updateTime(player) {
  const boundTime = Math.max(Math.min(player.currentTime, player.sound.duration), 0);
  time.elapsed.innerHTML = secondsToTime(boundTime);

  const boundPercentageDone = Math.max(Math.min((player.currentTime / player.sound.duration), 1), 0);
  bar.style.width = boundPercentageDone * 100 + "%";
}

export function refreshInfo(player) {
  player.playing = false;
  const refreshInfoEvent = new Event("refreshinfo");
  document.dispatchEvent(refreshInfoEvent);
}