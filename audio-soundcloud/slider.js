const slider = document.querySelector(".slider");
const bar = document.querySelector(".slider .passed");
const handle = document.querySelector(".slider .handle");

let startX = 0, currentX = 0, value = 0, dec = 0;
let events = {
  move: "pointermove",
  end: "pointerup",
  cancel: "pointercancel"
};

function limitValue(val, low = 0, high = slider.clientWidth) {
  let v = val;
  if (val < low) {v = low;}
  if (val > high) {v = high;}
  dec = v / high;
  return v;
}

function getPointerPosX(e) {
  if (e.targetTouches) {
    return e.targetTouches[0].clientX;
  } else {
    return e.clientX
  }
}

function handleMove(e) {
  e.preventDefault();
  requestAnimationFrame(() => {
    currentX = getPointerPosX(e);
    value = limitValue(currentX - startX);
    bar.style.width = (value / slider.clientWidth) * 100 + "%";
    let s = dec * player.sound.duration;
    elapsed.innerHTML = secondsToTime(s);
  });
}

function handleEnd(e) {
  e.preventDefault();
  requestAnimationFrame(() => {
    value = limitValue(getPointerPosX(e) - startX);
    widget.seekTo(dec * player.sound.duration);
    getCurrentTime().then(time=>{player.currentTime = time;});
    widget.setVolume(100);
    if (player.willResume) {player.play();}
  });
  document.removeEventListener(events.move, handleMove, true);
  document.removeEventListener(events.end, handleEnd, true);
  document.removeEventListener(events.cancel, handleEnd, true);
}

function handleDown(e) {
  e.preventDefault();
  requestAnimationFrame(() => {
    startX = slider.parentElement.offsetLeft;
    if (player.playing) {player.willResume = true;} else {player.willResume = false;}
    widget.pause();
    widget.setVolume(0);
  });
  document.addEventListener(events.move, handleMove, true);
  document.addEventListener(events.end, handleEnd, true);
  document.addEventListener(events.cancel, handleEnd, true);
}

if (window.PointerEvent) {
  slider.addEventListener('pointerdown', handleDown, true);
} else {
  slider.addEventListener('touchstart', handleDown, true);
  events.move = "touchmove";
  events.end = "touchend";
  events.cancel = "touchcancel";
  slider.addEventListener('mousedown', handleDown, true);
}