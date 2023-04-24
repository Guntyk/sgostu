import { adaloApi, headers } from "../requests";

// Dancers
export const getDancersFetch = async () =>
  adaloApi.get(`/t_1ucotahrksc4tgelc0d9q54i2?limit=3000`, {
    headers: headers,
  });

// Single Dancer
export const getDancerFetch = (dancerId) =>
  adaloApi.get(`/t_1ucotahrksc4tgelc0d9q54i2/${dancerId}`, {
    headers: headers,
  });

// Dancer Classes
export const getDancerClassesFetch = () =>
  adaloApi.get(`/t_0wnuo5fh8wb9emod6la6mbyx7`, {
    headers: headers,
  });
