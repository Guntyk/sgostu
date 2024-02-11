import { adaloApi } from 'api/requests';
import APIErrorsHandlingUtils from 'utils/APIErrorsHandlingUtils';

export default class AdaloDataService {
  static async fetchData(endpoint, params = '') {
    const [errors, response] = await adaloApi.get(`${endpoint}${params}`);

    if (errors) {
      return {
        result: null,
        errors: APIErrorsHandlingUtils.handleErrors(errors),
      };
    }

    return {
      result: response.records || response,
      errors: [],
    };
  }

  static async getStatuses() {
    return this.fetchData('/statuses');
  }

  static async getClubs() {
    return this.fetchData('/clubs');
  }

  static async getClub(clubId) {
    return this.fetchData(`/clubs/${clubId}`, `&timestamp=${new Date().getTime()}`);
  }

  static async getRegions() {
    return this.fetchData('/regions');
  }

  static async getCoaches() {
    return this.fetchData('/coaches');
  }

  static async getCoach(coachId) {
    return this.fetchData(`/coaches/${coachId}`, `&timestamp=${new Date().getTime()}`);
  }

  static async getDancers() {
    return this.fetchData('/dancers');
  }

  static async getDancer(dancerId) {
    return this.fetchData(`/dancers/${dancerId}`, `&timestamp=${new Date().getTime()}`);
  }

  static async getDancerClasses() {
    return this.fetchData('/dancerClasses');
  }

  static async getJudges() {
    return this.fetchData('/judges');
  }

  static async getJudge(judgeId) {
    return this.fetchData(`/judges/${judgeId}`, `&timestamp=${new Date().getTime()}`);
  }

  static async getJudgeClasses() {
    return this.fetchData('/judgeClasses');
  }
}
