/**
 * Returns formatted time string
 * @param   s    input milliseconds
 * @returns time  output time string
 */
export function secondsToTime(s = 0) {
  let time = new Date((s || 0) * 1000).toISOString().substr(11, 8);
  if (time.charAt(0) == 0 && time.charAt(1) == 0) {
    time = time.slice(-5);
    if (time.charAt(0) == 0) {
      time = time.slice(-4);
    }
  }
  return time;
}