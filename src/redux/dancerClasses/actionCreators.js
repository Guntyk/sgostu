import { GET_DANCER_CLASSES } from "./actionTypes";

export function getClassesAction(dancerClassesArr) {
  return { type: GET_DANCER_CLASSES, dancerClassesArr };
}
