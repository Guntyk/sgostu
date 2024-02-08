import { getManagementFetch } from '../../api/Strapi/management';
import { getManagementAction } from './actionCreators';

export function getManagement() {
  return (dispatch) => {
    getManagementFetch().then((response) => {
      if (response) {
        dispatch(getManagementAction(response.at(-1).data));
      }
    });
  };
}
