import axios from "axios";

export const headers = {
  Authorization: "Bearer 6jc07gmucphms07orzwj5czv5",
  "Content-Type": "application/json",
};

export const backendApi = axios.create({
  baseURL: "https://sgostu-backend.download/api",
});
export const adaloApi = axios.create({
  baseURL:
    "https://api.adalo.com/v0/apps/320255a5-09a4-44a2-9df0-84649b4058b5/collections",
});

backendApi.interceptors.response.use(
  (response) => [null, response.data],
  (error) => [error, null]
);
adaloApi.interceptors.response.use(
  (response) => [null, response.data],
  (error) => [error, null]
);
