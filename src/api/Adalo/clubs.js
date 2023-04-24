import { adaloApi, headers } from "../requests";

// Clubs
export const getClubsFetch = () =>
  adaloApi.get("/t_3ly38xw8f3j66xxqjnpseal9x", {
    headers: headers,
  });

// Single Club
export const getClubFetch = (clubId) =>
  adaloApi.get(`/t_3ly38xw8f3j66xxqjnpseal9x/${clubId}`, {
    headers: headers,
  });
