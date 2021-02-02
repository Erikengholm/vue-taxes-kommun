import SessionService from '@/providers/services/session/session';

export default {

  /**
   * @function isAuthenticated
   * This Method is used to check the user is authenticated
   */
  isAuthenticated () {
    const isAuthenticated = SessionService.isAuthenticated();
    return isAuthenticated;
  }
};
