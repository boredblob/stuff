import {buttons, svgs, time, bar} from "./elements.mjs";
import {secondsToTime} from "./timeStuff.mjs";

export function loadButtons(widget, player, updateFunction) {
  buttons.playpause.onclick = () => {
    if (player.playing) {
      player.pause();
      buttons.playpause.innerHTML = svgs.play;
    } else {
      player.play();
      buttons.playpause.innerHTML = svgs.pause;
      requestAnimationFrame(updateFunction);
    }
  };
  
  buttons.rewind.onclick = () => {
    const newTime = Math.max(Math.min(player.currentTime - 10000 , player.sound.duration), 0);
    widget.seekTo(player.currentTime = newTime);
    updateTime(player);
  };
  buttons.fast_forward.onclick = () => {    
    const newTime = Math.max(Math.min(player.currentTime + 10000 , player.sound.duration), 0);
    widget.seekTo(player.currentTime = newTime);
    updateTime(player);
  };

  buttons.skip_forward.onclick = () => {
    widget.next();
  };

  buttons.skip_back.onclick = () => {
    widget.prev();
  };
}

export function updateTime(player) {
  const boundTime = Math.max(Math.min(player.currentTime, player.sound.duration), 0);
  time.elapsed.innerHTML = secondsToTime(boundTime);

  const boundPercentageDone = Math.max(Math.min((player.currentTime / player.sound.duration), 1), 0);
  bar.style.width = boundPercentageDone * 100 + "%";
}