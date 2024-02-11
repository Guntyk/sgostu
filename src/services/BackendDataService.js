import { backendApi } from 'api/requests';
import APIErrorsHandlingUtils from 'utils/APIErrorsHandlingUtils';

export default class BackendDataService {
  static async fetchData(endpoint, params = '') {
    const [errors, response] = await backendApi.get(`${endpoint}${params}`);
    console.log(response);

    if (errors) {
      console.log(errors);
      return {
        result: null,
        errors: APIErrorsHandlingUtils.handleErrors(errors),
      };
    }

    return {
      result: response.data || response,
      errors: [],
    };
  }

  static async getEvents() {
    return this.fetchData(
      '/events?fields=title,town,start,end,address,type,organizator,rating,foreign,spartak,registration,judges&populate[0]=partners.logo&populate[1]=organizations.logo&populate[2]=banner&populate[3]=entry&pagination[pageSize]=100&sort=start'
    );
  }

  static async getOrganizations() {
    return this.fetchData('/organizations?populate=*&fields=name');
  }
}
