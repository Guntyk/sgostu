import axios from "axios";

const backendApi = axios.create({
  baseURL: "https://backend-tbpix.ondigitalocean.app/api",
});

backendApi.interceptors.response.use(
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
    "/events?fields=title,town,start,end,address,type,organizator,rating,foreign,spartak,registration,judges&populate[0]=partners.logo&populate[1]=organizations&populate[2]=banner&populate[3]=entry&pagination[pageSize]=100&sort=start"
  );
export const getEventFetch = (eventId) => backendApi.get(`/event/${eventId}`);

//* Organizations
export const getOrganizationsFetch = () =>
  backendApi.get("/organizations?populate=*&fields=name");

//* Dancers
export const getDancersFetch = () => backendApi.get("/dancer");
export const getDancerFetch = (dancerId) =>
  backendApi.get(`/dancer/${dancerId}`);

//* Telegram Bot
const chatIds = [904054855, 1133429141]; // Kirill: 688334536
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
