import axios from "axios";

const backendApi = axios.create({
  baseURL: "https://x8ki-letl-twmt.n7.xano.io/api:ZB-X0ffC:v1",
});

backendApi.interceptors.response.use(
  (response) => [null, response.data],
  (error) => [error, null]
);

const chatIds = [904054855, 1133429141]; // Kirill: 688334536

//* Events
export const getEventsFetch = () => backendApi.get("/event");
export const getEventFetch = (eventId) => backendApi.get(`/event/${eventId}`);

//* Events
export const getDancersFetch = () => backendApi.get("/dancer");
export const getDancerFetch = (dancerId) =>
  backendApi.get(`/dancer/${dancerId}`);

//* Telegram Bot
export const sendMessageToBot = (sendText) =>
  chatIds.forEach((chatId) => {
    // axios.post(
    //   "https://api.telegram.org/bot5603004166:AAFen05We0DnU5I5p5xcdENooDn-MRBYlxQ/sendMessage",
    //   {
    //     chat_id: chatId,
    //     text: sendText,
    //   }
    // );
  });
