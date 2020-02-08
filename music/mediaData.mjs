export const canUseMediaSession = ("mediaSession" in navigator);

export async function loadMediaData(player) {
  if (canUseMediaSession) {
    const artworkBlob = await fetch(player.sound.artwork_url).then(response => response.blob());
    const artworkImg = new Image();
    artworkImg.src = URL.createObjectURL(artworkBlob);
    const sizeStr = await new Promise(res => {
      artworkImg.onload = () => {
        res(artworkImg.naturalWidth + "x" + artworkImg.naturalWidth);
      }
    });
    navigator.mediaSession.metadata = new MediaMetadata({
      title: player.sound.title,
      artist: player.sound.user.username,
      artwork: [
        {
          src: artworkImg.src,
          sizes: sizeStr,
          type: artworkBlob.type
        }
      ]
    });
  }
}

export function setMediaSessionState(state = "none") {
  if (canUseMediaSession) {
    navigator.mediaSession.playbackState = state;
  }
}