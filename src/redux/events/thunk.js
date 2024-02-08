import { getEventsFetch } from '../../api/Strapi/events';
import { getEventsAction } from './actionCreators';

export function getEvents() {
  return (dispatch) => {
    getEventsFetch().then(([eventsErr, events]) => {
      if (events) {
        const eventsArr = events.data.filter((event) =>
          event.attributes.end
            ? Date.parse(event.attributes.end) >= Date.parse(new Date().toISOString().slice(0, 10))
            : Date.parse(event.attributes.start) >= Date.parse(new Date().toISOString().slice(0, 10))
        );
        dispatch(getEventsAction(eventsArr));
      } else {
        console.log(eventsErr);
      }
    });
  };
}
