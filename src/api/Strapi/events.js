import { backendApi } from "../requests";

// Events
export const getEventsFetch = () =>
  backendApi.get(
    "/events?fields=title,town,start,end,address,type,organizator,rating,foreign,spartak,registration,judges&populate[0]=partners.logo&populate[1]=organizations.logo&populate[2]=banner&populate[3]=entry&pagination[pageSize]=100&sort=start"
  );

// Single Event
export const getEventFetch = (eventId) => backendApi.get(`/event/${eventId}`);
