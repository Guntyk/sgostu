import { GET_DANCER_CLASSES } from "./actionTypes";

export function getDancerClassesAction(dancerClassesArr) {
  return { type: GET_DANCER_CLASSES, dancerClassesArr };
}
