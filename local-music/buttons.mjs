import {buttons, time, bar} from "./elements.mjs";
import {secondsToTime} from "./timeStuff.mjs";
import {canUseMediaSession} from "./mediaData.mjs";

export function loadButtons(player, updateFunction) {
  function playpause() {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
      requestAnimationFrame(updateFunction);
    }
  }

  function rewind() {
    const newTime = Math.max(Math.min(player.srcElement.currentTime - 10 , player.srcElement.duration), 0);
    player.srcElement.currentTime = newTime;
    updateTime(player);
  }

  function fast_forward() {
    const newTime = Math.max(Math.min(player.srcElement.currentTime + 10 , player.srcElement.duration), 0);
    player.srcElement.currentTime = newTime;
    updateTime(player);
  }

  function skip_back() {
    if (player.soundIndex > 0) {
      player.soundIndex--;
      player.srcElement.src = player.song.src;
    } else {
      player.srcElement.currentTime = 0;
    }
  }

  function skip_forward() {
    player.soundIndex++;
    player.srcElement.src = player.song.src;
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
  
  const actionOverlay = document.querySelector(".action-overlay");
  
  document.body.onclick = e => {
    if (e.target === document.body) {
      actionOverlay.style.transition = "";
      actionOverlay.style.opacity = 1;
      actionOverlay.style.transform = "";
      if (player.playing) {
        actionOverlay.style.backgroundImage = "url('./icons/pause.svg')";
        player.pause();
      } else {
        actionOverlay.style.backgroundImage = "url('./icons/play.svg')";
        player.play();
        requestAnimationFrame(updateFunction);
      }
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          actionOverlay.style.transition = "transform 0.5s ease-in-out, opacity 0.5s ease-in-out";
          actionOverlay.style.opacity = 0;
          actionOverlay.style.transform = "translate(-50%, -50%) scale(1.6)";
        });
      });
    }
  }
}

export function updateTime(player) {
  const currentTime = player.srcElement.currentTime || 0;
  const boundTime = Math.max(Math.min(currentTime, player.srcElement.duration), 0);
  time.elapsed.innerHTML = secondsToTime(boundTime);

  const boundPercentageDone = Math.max(Math.min((currentTime / player.srcElement.duration), 1), 0);
  bar.style.width = boundPercentageDone * 100 + "%";
}