import {getCurrentTime} from "./widget.mjs";

export let timePromise;
export let timePromiseValue = null;

export function resetTimePromise(widget) {
  timePromise = getCurrentTime(widget);
  timePromiseValue = null;
  timePromise.then(t=>{timePromiseValue = t;}).catch();
}