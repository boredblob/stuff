import {buttons, svgs, time, bar} from "./elements.mjs";
import {secondsToTime} from "./timeStuff.mjs";

export function loadButtons(widget, player, updateFunction) {
  function playpause() {
    if (player.playing) {
      player.pause();
      buttons.playpause.innerHTML = svgs.play;
    } else {
      player.play();
      buttons.playpause.innerHTML = svgs.pause;
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
    widget.prev();
  }

  function skip_forward() {
    widget.next()
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
}

export function updateTime(player) {
  const boundTime = Math.max(Math.min(player.currentTime, player.sound.duration), 0);
  time.elapsed.innerHTML = secondsToTime(boundTime);

  const boundPercentageDone = Math.max(Math.min((player.currentTime / player.sound.duration), 1), 0);
  bar.style.width = boundPercentageDone * 100 + "%";
}