export async function loadWidget(trackID = 0) {
  const iframe = document.querySelector(".widget");
  iframe.src = "https://w.soundcloud.com/player/?url=";

  const loadedWidget = SC.Widget(iframe);
  const url = "https://api.soundcloud.com/tracks/" + trackID;
  loadedWidget.load(url);
  
  return await new Promise(resolve => {
    loadedWidget.bind(SC.Widget.Events.READY, () => {
      resolve(loadedWidget);
    });
  });
}

export async function getCurrentTime(widget) {
  return new Promise(resolve => {
    widget.getPosition(s=>{resolve(s);});
  });
}