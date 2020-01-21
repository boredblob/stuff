export const svgs = {
  play: '<svg viewBox="0 0 21 24"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>',
  pause: '<svg viewBox="0 0 24 24" ><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>'
}

export const overlay = document.querySelector(".overlay");

export const artist = document.querySelector(".info .artist");
export const title = document.querySelector(".info .title");

export const slider = document.querySelector(".slider");
export const bar = document.querySelector(".slider .passed");

const timeDisplay = document.querySelector(".controls .time");

export const time = {
  elapsed: timeDisplay.querySelector(".elapsed"),
  duration: timeDisplay.querySelector(".duration")
}


const buttonsElement = document.querySelector(".buttons");

export const buttons = {
  playpause: buttonsElement.querySelector(".playpause"),
  rewind: buttonsElement.querySelector(".rewind"),
  fast_forward: buttonsElement.querySelector(".fast-forward"),
  skip_forward: buttonsElement.querySelector(".skip-forward"),
  skip_back: buttonsElement.querySelector(".skip-back")
};