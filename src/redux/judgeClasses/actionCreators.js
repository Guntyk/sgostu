import { GET_JUDGE_CLASSES } from "./actionTypes";

export function getJudgeClassesAction(judgeClassesArr) {
  return { type: GET_JUDGE_CLASSES, judgeClassesArr };
}
