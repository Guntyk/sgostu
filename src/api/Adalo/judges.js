import { adaloApi, headers } from "../requests";

// Judges
export const getJudgesFetch = () =>
  adaloApi.get("/t_7cuuwcj0h9gr250xkiwxv0qv0", {
    headers: headers,
  });

// Single Judge
export const getJudgeFetch = (judgeId) =>
  adaloApi.get(`/t_7cuuwcj0h9gr250xkiwxv0qv0/${judgeId}`, {
    headers: headers,
  });

// Judge Classes
export const getJudgeClassesFetch = () =>
  adaloApi.get("/t_d67j8boj781o5qhv2b3g5had0", {
    headers: headers,
  });
