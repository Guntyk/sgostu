import { adaloApi, headers } from "../requests";

// Coaches
export const getCoachesFetch = () =>
  adaloApi.get("/t_0krimgt2jojxj54w8kaqyc676", { headers: headers });

// Single Coach
export const getCoachFetch = (coachId) =>
  adaloApi.get(`/t_0krimgt2jojxj54w8kaqyc676/${coachId}`, { headers: headers });
