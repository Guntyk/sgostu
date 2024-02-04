import { adaloApi } from 'api/requests';
import APIErrorsHandlingUtils from 'utils/APIErrorsHandlingUtils';

export default class AdaloDataService {
  static async getDancers() {
    const [errors, data] = await adaloApi.get('/dancers');

    if (errors) {
      return { result: null, errors: APIErrorsHandlingUtils.handleErrors(errors) };
    }

    return { result: data, errors: [] };
  }

  static async getDancerClasses() {
    const [errors, data] = await adaloApi.get('/dancerClasses');

    if (errors) {
      return { result: null, errors: APIErrorsHandlingUtils.handleErrors(errors) };
    }

    return { result: data, errors: [] };
  }

  static async getStatuses() {
    const [errors, data] = await adaloApi.get('/statuses');

    if (errors) {
      return { result: null, errors: APIErrorsHandlingUtils.handleErrors(errors) };
    }

    return { result: data, errors: [] };
  }
}
