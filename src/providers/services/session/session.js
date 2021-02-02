export default {

  /**
   * @function getSession
   * This Method is used to set the session
   */
  setSession (session) {
    localStorage.setItem('inext_user_session', JSON.stringify(session));
  },

  /**
   * @function getSession
   * This Method is used to get the session details from the ionic storage
   */
  getSession () {
    const sessionData = localStorage.getItem('inext_user_session');
    return JSON.parse(sessionData);
  },

  /**
   * @function isAuthenticated
   * This Method is used to check the user is authenticated or not
   */
  isAuthenticated () {
    const session = this.getSession();
    return this.isLoggedInUser(session);
  },

  /**
   * @function isLoggedInUser
   * This Method is used to check the user is logged in or not
   */
  isLoggedInUser (session) {
    return !!((session !== null && session.accessToken && session.accessToken.payload && session.accessToken.payload.username));
  }
};
