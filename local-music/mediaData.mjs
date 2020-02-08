export const canUseMediaSession = ("mediaSession" in navigator);

export async function loadMediaData(player, url) {
  if (canUseMediaSession) {
    const artworkBlob = await fetch(url).then(response => response.blob());
    const artworkImg = new Image();
    artworkImg.src = URL.createObjectURL(artworkBlob);
    const sizeStr = await new Promise(res => {
      artworkImg.onload = () => {
        const size = Math.max(artworkImg.naturalWidth, artworkImg.naturalHeight);
        res(size + "x" + size);
      }
    });
    navigator.mediaSession.metadata = new MediaMetadata({
      title: player.song.title,
      artist: player.song.artist,
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