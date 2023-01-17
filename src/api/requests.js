import axios from "axios";

const backendApi = axios.create({
  baseURL: "https://sgostu-backend-v2.onrender.com/api",
});

backendApi.interceptors.response.use(
  (response) => [null, response.data],
  (error) => [error, null]
);

//* Courses
export const getEventsFetch = () =>
  backendApi.get("/events?pagination[pageSize]=50");
