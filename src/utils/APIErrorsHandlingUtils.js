import { apiErrors } from "constants/apiErrors";

const {
  defaultError,
  error401,
  error403,
  error404,
  error500,
  noResponseError,
} = apiErrors;

export default class APIErrorsHandlingUtils {
  static handleErrors(error) {
    if (error.response) {
      const { status, data } = error.response;

      switch (status) {
        case 400:
          return this.handle400Errors(data.errors || {});
        case 401:
          return [error401];
        case 403:
          return [error403];
        case 404:
          return [error404];
        case 500:
          return [error500];
        default:
          return [defaultError];
      }
    } else if (error.request) {
      return [noResponseError];
    } else {
      return [defaultError];
    }
  }

  static handle400Errors(errorsObject) {
    return Object.values(errorsObject || {});
  }
}
