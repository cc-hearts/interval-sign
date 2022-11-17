/**
 * @author heart
 * @description
 * @Date 2022-11-08
 */
import type { callback, timerCallback } from "./types";

function addInterval(callback: timerCallback, time = 1000 * 10) {
  callback._timer = setInterval(() => {
    callback instanceof Function && callback();
  }, time);
}
let task = new Map();
function addTask(id: number, callback: callback) {
  if (task.has(callback)) {
    return;
  }
  task.set(id, callback);
}

function removeTask(id: number) {
  if (task.has(id)) {
    task.delete(id);
  }
}

function useTask() {
  const arr = [...task];
  task.clear();
  arr.forEach((data) => {
    const [_, callback] = data;
    callback instanceof Function && callback();
  });
}
function removeInterval(callback: timerCallback) {
  clearInterval(callback._timer);
  callback._timer = void 0;
}

export { addInterval, removeInterval, addTask, removeTask, useTask };
