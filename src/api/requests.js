import axios from "axios";

const headers = {
  Authorization: "Bearer 6jc07gmucphms07orzwj5czv5",
  "Content-Type": "application/json",
};

const backendApi = axios.create({
  baseURL: "https://sgostu-backend.download/api",
});
const adaloApi = axios.create({
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

//* Articles
export const getArticlesFetch = () =>
  backendApi.get(
    "/articles?fields=title,description,type,createdAt&populate=*&sort=createdAt&pagination[pageSize]=50"
  );

//* Events
export const getEventsFetch = () =>
  backendApi.get(
    "/events?fields=title,town,start,end,address,type,organizator,rating,foreign,spartak,registration,judges&populate[0]=partners.logo&populate[1]=organizations.logo&populate[2]=banner&populate[3]=entry&pagination[pageSize]=100&sort=start"
  );
export const getEventFetch = (eventId) => backendApi.get(`/event/${eventId}`);

//* Organizations
export const getOrganizationsFetch = () =>
  backendApi.get("/organizations?populate=*&fields=name");

//* Status
export const getStatusesFetch = () =>
  adaloApi.get("/t_0qa6znyf9ff60hbu7neeis31j", {
    headers: headers,
  });

//* Dancers
export const getDancersFetch = () =>
  adaloApi.get(`/t_1ucotahrksc4tgelc0d9q54i2`, {
    headers: headers,
  });
export const getDancerFetch = (dancerId) =>
  adaloApi.get(`/t_1ucotahrksc4tgelc0d9q54i2/${dancerId}`, {
    headers: headers,
  });

//* Clubs
export const getClubsFetch = () =>
  adaloApi.get("/t_3ly38xw8f3j66xxqjnpseal9x", {
    headers: headers,
  });
export const getClubFetch = (clubId) =>
  adaloApi.get(`/t_3ly38xw8f3j66xxqjnpseal9x/${clubId}`, {
    headers: headers,
  });

//* Coaches
export const getCoachesFetch = () =>
  adaloApi.get("/t_0krimgt2jojxj54w8kaqyc676", {
    headers: headers,
  });
export const getCoachFetch = (coachId) =>
  adaloApi.get(`/t_0krimgt2jojxj54w8kaqyc676/${coachId}`, {
    headers: headers,
  });

//* Telegram Bot
const chatIds = [904054855, 1133429141]; // Kirill: 688334536
export const sendMessageToBot = (sendText) =>
  chatIds.forEach((chatId) => {
    axios.post(
      "https://api.telegram.org/bot5603004166:AAFen05We0DnU5I5p5xcdENooDn-MRBYlxQ/sendMessage",
      {
        chat_id: chatId,
        text: sendText,
      }
    );
  });
