import { GET_CLASSES } from "./actionTypes";

export function getClassesAction(classesArr) {
  return { type: GET_CLASSES, classesArr };
}
