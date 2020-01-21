export async function loadWidget(trackID = 674187014) {
  const iframe = document.querySelector(".widget");
  iframe.src = "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/" + trackID;

  const loadedWidget = SC.Widget(iframe);

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