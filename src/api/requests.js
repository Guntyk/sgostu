import axios from "axios";

const backendApi = axios.create({
  baseURL: "http://localhost:1337/api",
});

backendApi.interceptors.response.use(
  (response) => [null, response.data],
  (error) => [error, null]
);

//* Courses
export const getEventsFetch = () =>
  backendApi.get("/events?pagination[pageSize]=50");
