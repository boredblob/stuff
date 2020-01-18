const svgs = {
  play: '<svg viewBox="0 0 21 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
  pause: '<svg viewBox="0 0 24 24" ><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>'
}

const overlay = document.querySelector(".overlay");

const iframe = document.querySelector(".widget");
const widget = SC.Widget(iframe);

const artist = document.querySelector(".info .artist");
const title = document.querySelector(".info .title");

const timeDisplay = document.querySelector(".controls .time");
const elapsed = timeDisplay.querySelector(".elapsed");
const duration = timeDisplay.querySelector(".duration");


const player = {
  sound: {},
  playing: false,
  currentTime: 0,
  willResume: false,
  play: () => {
    player.playing = true;
    overlay.style.opacity = 0.2;
    widget.play();
    requestAnimationFrame(update);
  },
  pause: () => {
    player.playing = false;
    overlay.style.opacity = 0.6;
    widget.pause();
  }
};

widget.bind(SC.Widget.Events.READY, () => {
  getCurrentSound()
    .then(sound=>{
      player.sound = sound;
      duration.innerHTML = secondsToTime(player.sound.duration);

      let artistLink = document.createElement("a");
      artistLink.href = player.sound.user.permalink_url;
      artistLink.innerHTML = player.sound.user.username;
      artist.innerHTML = artistLink.outerHTML;

      let titleLink = document.createElement("a");
      titleLink.href = player.sound.permalink_url;
      titleLink.innerHTML = player.sound.title;
      title.innerHTML = titleLink.outerHTML;
    });
});

function getCurrentSound() {
  return new Promise((resolve, reject) => {
    widget.getCurrentSound(s=>{resolve(s);});
  });
}

function getCurrentTime() {
  return new Promise((resolve, reject) => {
    widget.getPosition(s=>{resolve(s);});
  });
}