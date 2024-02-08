import { adaloApi } from 'api/requests';
import APIErrorsHandlingUtils from 'utils/APIErrorsHandlingUtils';

export default class AdaloDataService {
  static async getStatuses() {
    const [errors, { records }] = await adaloApi.get('/statuses');

    if (errors) {
      return {
        result: null,
        errors: APIErrorsHandlingUtils.handleErrors(errors),
      };
    }

    return { result: records, errors: [] };
  }

  static async getClubs() {
    const [errors, { records }] = await adaloApi.get('/clubs');

    if (errors) {
      return {
        result: null,
        errors: APIErrorsHandlingUtils.handleErrors(errors),
      };
    }

    return {
      result: records,
      errors: [],
    };
  }

  static async getClub(clubId) {
    const [errors, data] = await adaloApi.get(`/clubs/${clubId}&timestamp=${new Date().getTime()}`);

    if (errors) {
      return {
        result: null,
        errors: APIErrorsHandlingUtils.handleErrors(errors),
      };
    }

    return {
      result: data,
      errors: [],
    };
  }

  static async getRegions() {
    const [errors, { records }] = await adaloApi.get('/regions');

    if (errors) {
      return {
        result: null,
        errors: APIErrorsHandlingUtils.handleErrors(errors),
      };
    }

    return {
      result: records,
      errors: [],
    };
  }

  static async getCoaches() {
    const [errors, { records }] = await adaloApi.get('/coaches');

    if (errors) {
      return {
        result: null,
        errors: APIErrorsHandlingUtils.handleErrors(errors),
      };
    }

    return {
      result: records,
      errors: [],
    };
  }

  static async getCoach(coachId) {
    const [errors, data] = await adaloApi.get(`/coaches/${coachId}&timestamp=${new Date().getTime()}`);

    if (errors) {
      return {
        result: null,
        errors: APIErrorsHandlingUtils.handleErrors(errors),
      };
    }

    return {
      result: data,
      errors: [],
    };
  }

  static async getDancers() {
    const [errors, { records }] = await adaloApi.get('/dancers');

    if (errors) {
      return {
        result: null,
        errors: APIErrorsHandlingUtils.handleErrors(errors),
      };
    }

    return {
      result: records,
      errors: [],
    };
  }

  static async getDancer(dancerId) {
    const [errors, data] = await adaloApi.get(`/dancers/${dancerId}&timestamp=${new Date().getTime()}`);

    if (errors) {
      return {
        result: null,
        errors: APIErrorsHandlingUtils.handleErrors(errors),
      };
    }

    return {
      result: data,
      errors: [],
    };
  }

  static async getDancerClasses() {
    const [errors, { records }] = await adaloApi.get('/dancerClasses');

    if (errors) {
      return {
        result: null,
        errors: APIErrorsHandlingUtils.handleErrors(errors),
      };
    }

    return { result: records, errors: [] };
  }

  static async getJudges() {
    const [errors, { records }] = await adaloApi.get('/judges');

    if (errors) {
      return {
        result: null,
        errors: APIErrorsHandlingUtils.handleErrors(errors),
      };
    }

    return {
      result: records,
      errors: [],
    };
  }

  static async getJudge(judgeId) {
    const [errors, data] = await adaloApi.get(`/judges/${judgeId}&timestamp=${new Date().getTime()}`);

    if (errors) {
      return {
        result: null,
        errors: APIErrorsHandlingUtils.handleErrors(errors),
      };
    }

    return {
      result: data,
      errors: [],
    };
  }

  static async getJudgeClasses() {
    const [errors, { records }] = await adaloApi.get('/judgeClasses');

    if (errors) {
      return {
        result: null,
        errors: APIErrorsHandlingUtils.handleErrors(errors),
      };
    }

    return {
      result: records,
      errors: [],
    };
  }
}
